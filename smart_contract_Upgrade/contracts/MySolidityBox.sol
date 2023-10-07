// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract MySolidityBox {

    uint256 transactionCount;
    uint256 sandeep;

    struct TransferStruct{
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;  
    } 

   TransferStruct[] transactions;

   function initializesandeep(uint _sandeep) external{
        sandeep = _sandeep; 
    }


    event Transfer(address from, address receiver , uint amount , string message, uint256 timestamp, string keyword);

    
   function addToBlockChain(address payable receiver, uint amount , string memory message, string memory keyword ) public {

       transactionCount += 1;
       transactions.push(TransferStruct(msg.sender , receiver, amount , message, block.timestamp, keyword ));
       emit Transfer(msg.sender , receiver, amount , message, block.timestamp, keyword);
   } 

   function getTransactionCount() public view returns (uint256){
       return transactionCount; 
   }

   function getAllTransaction() public view returns (TransferStruct[] memory){
       return transactions;
   }
}