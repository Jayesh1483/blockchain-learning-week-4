# blockchain-learning-week-4

### **Week 4 Assignment:** Building an Advanced Smart Contract

---

### Background:

Create a sophisticated smart contract that simulates a basic supply chain process for a product, from creation to the end sale, showcasing advanced Solidity features. Write tests for the contract using hardhat.

### Requirements:

1. **Contract Name**: ProductSupplyChain
2. **Structs and State Variables:** 
    - Define a Product struct with properties like productId, name, currentOwner, price, and state.
    - Store Product instances mapped by their productId.
3. **Functionality:**
    1. **Ownership (Access Control)**:  Implement an ownership management system (use Ownable pattern).
    2. **Creating a Product**: Function to create a new Product, setting the creator as the currentOwner. (Keep in mind the functions visibility)
    3. **Modifiers and Restrictions**: Modifiers to restrict functionality based on ownership or use open-zeppelin’s AccessControl library for its inbuilt modifiers.
    4. **Interacting with Other Contracts**: Use an interface to interact with another contract (e.g., verifying a condition in an external registry). (Ponder over tx.origin authentication if necessary)
    5. **Events and Transaction Information**: Implement event logs for actions like ProductCreated, ProductSold, OwnershipTransferred.
    6. **Library Use**: (Bonus) Utilize a library for aspects like data management or calculations.
    7. **Sale Process**: Function to simulate the product sale, transferring ownership, and updating relevant information. (Keep in mind the functions visibility)
    8. **Error Handling**: Implement error handling for conditions like non-existent product IDs, actions restricted to the owner, or invalid operations.

### Testing:

Write comprehensive unit tests for the smart contract using hardhat covering all possible happy paths and bad paths. For example: an administrative function cannot be called by anyone other than the owner, a non-existent product should not be put to sale etc.

### Submission:

- Thoroughly commented Solidity contract code.
- README.md file explaining the contract process, assumptions, or specific conditions.
- Separate file demonstrating interaction with another contract through your defined interface.

### Evaluation:

- Assignments will be evaluated on code cleanliness, proper use of advanced Solidity features, error handling, and the successful simulation of a supply chain process. Extra consideration for thoughtful interactions with external contracts and additional advanced patterns used.

### Submission Instructions:

- Push all your code to a **`blockchain-learning-week-4`** GitHub repository.
- Include comprehensive comments and a clear README outlining the contract's functionalities and interactions.
- Document any test cases or specific scenarios you've covered in your testing phase.
