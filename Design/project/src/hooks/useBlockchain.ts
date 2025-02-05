import { useState, useCallback } from 'react';
import { AgriChainContract } from '../contracts/AgriChainContract';
import type { Product, QualityCheck, ProductHistory } from '../types';

export function useBlockchain() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const contract = new AgriChainContract();

  const getProduct = useCallback(async (productId: string): Promise<Product | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [name, origin, timestamp] = await contract.getProduct(productId);
      const [organizations, scores, certificationIds] = await contract.getQualityChecks(productId);
      const [actions, actors, roles, locations] = await contract.getHistory(productId);

      // Convert blockchain data to our Product interface
      const qualityChecks: QualityCheck[] = organizations.map((org, i) => ({
        organization: org,
        score: scores[i],
        timestamp: new Date(timestamp * 1000).toISOString(),
        certificationId: certificationIds[i],
        notes: [] // Notes are not stored on-chain for gas efficiency
      }));

      const history: ProductHistory[] = actions.map((action, i) => ({
        timestamp: new Date(timestamp * 1000).toISOString(),
        action,
        actor: actors[i],
        role: roles[i],
        location: locations[i],
        details: '' // Details are not stored on-chain for gas efficiency
      }));

      return {
        id: productId,
        name,
        origin,
        farmer: actors.find((_: string, i: number) => roles[i] === 'Farmer') || '',
        manufacturer: actors.find((_: string, i: number) => roles[i] === 'Manufacturer') || '',
        distributor: actors.find((_: string, i: number) => roles[i] === 'Distributor') || '',
        wholesaler: actors.find((_: string, i: number) => roles[i] === 'Wholesaler') || '',
        retailer: actors.find((_: string, i: number) => roles[i] === 'Retailer') || '',
        productionDate: new Date(timestamp * 1000).toISOString().split('T')[0],
        qualityChecks,
        history
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch product data');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [contract]);

  const addProduct = useCallback(async (
    productId: string,
    name: string,
    origin: string
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await contract.addProduct(productId, name, origin);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add product');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [contract]);

  const addQualityCheck = useCallback(async (
    productId: string,
    organization: string,
    score: number,
    certificationId: string
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await contract.addQualityCheck(productId, organization, score, certificationId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add quality check');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [contract]);

  return {
    getProduct,
    addProduct,
    addQualityCheck,
    isLoading,
    error
  };
}