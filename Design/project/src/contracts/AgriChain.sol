// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AgriChain {
    struct Product {
        string name;
        string origin;
        uint256 timestamp;
        bool exists;
    }
    
    struct QualityCheck {
        string organization;
        uint8 score;
        string certificationId;
        uint256 timestamp;
    }
    
    struct HistoryEntry {
        string action;
        string actor;
        string role;
        string location;
        uint256 timestamp;
    }
    
    mapping(string => Product) private products;
    mapping(string => QualityCheck[]) private qualityChecks;
    mapping(string => HistoryEntry[]) private history;
    
    event ProductAdded(string productId, string name, string origin);
    event QualityCheckAdded(string productId, string organization, uint8 score);
    event HistoryEntryAdded(string productId, string action, string actor);
    
    modifier productExists(string memory productId) {
        require(products[productId].exists, "Product does not exist");
        _;
    }
    
    function addProduct(
        string memory productId,
        string memory name,
        string memory origin
    ) public {
        require(!products[productId].exists, "Product already exists");
        
        products[productId] = Product({
            name: name,
            origin: origin,
            timestamp: block.timestamp,
            exists: true
        });
        
        emit ProductAdded(productId, name, origin);
    }
    
    function addQualityCheck(
        string memory productId,
        string memory organization,
        uint8 score,
        string memory certificationId
    ) public productExists(productId) {
        require(score <= 100, "Score must be between 0 and 100");
        
        QualityCheck memory check = QualityCheck({
            organization: organization,
            score: score,
            certificationId: certificationId,
            timestamp: block.timestamp
        });
        
        qualityChecks[productId].push(check);
        emit QualityCheckAdded(productId, organization, score);
    }
    
    function addHistoryEntry(
        string memory productId,
        string memory action,
        string memory actor,
        string memory role,
        string memory location
    ) public productExists(productId) {
        HistoryEntry memory entry = HistoryEntry({
            action: action,
            actor: actor,
            role: role,
            location: location,
            timestamp: block.timestamp
        });
        
        history[productId].push(entry);
        emit HistoryEntryAdded(productId, action, actor);
    }
    
    function getProduct(string memory productId) 
        public 
        view 
        productExists(productId) 
        returns (string memory name, string memory origin, uint256 timestamp) 
    {
        Product memory product = products[productId];
        return (product.name, product.origin, product.timestamp);
    }
    
    function getQualityChecks(string memory productId) 
        public 
        view 
        productExists(productId) 
        returns (
            string[] memory organizations,
            uint8[] memory scores,
            string[] memory certificationIds
        ) 
    {
        QualityCheck[] memory checks = qualityChecks[productId];
        uint256 length = checks.length;
        
        organizations = new string[](length);
        scores = new uint8[](length);
        certificationIds = new string[](length);
        
        for (uint256 i = 0; i < length; i++) {
            organizations[i] = checks[i].organization;
            scores[i] = checks[i].score;
            certificationIds[i] = checks[i].certificationId;
        }
        
        return (organizations, scores, certificationIds);
    }
    
    function getHistory(string memory productId) 
        public 
        view 
        productExists(productId) 
        returns (
            string[] memory actions,
            string[] memory actors,
            string[] memory roles,
            string[] memory locations
        ) 
    {
        HistoryEntry[] memory entries = history[productId];
        uint256 length = entries.length;
        
        actions = new string[](length);
        actors = new string[](length);
        roles = new string[](length);
        locations = new string[](length);
        
        for (uint256 i = 0; i < length; i++) {
            actions[i] = entries[i].action;
            actors[i] = entries[i].actor;
            roles[i] = entries[i].role;
            locations[i] = entries[i].location;
        }
        
        return (actions, actors, roles, locations);
    }
}