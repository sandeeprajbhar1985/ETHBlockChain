import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();
const { ethereum } = window;

// Fetch etherum contract
const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionsContract;
};

// Create context to call the etherum contract , every context provdie get children and in return the Transection context
export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [trasactionCount, setTrasactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  // Check if MetaMask wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamnask"); // If Metamask is not installed the ethereum value from
      // console of crome will not appear
      const accounts = await ethereum.request({ method: "eth_accounts" }); // get Metamask connected account

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransaction();

      } else {
        console.log("No record found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object checkIfWalletIsConnected");
    }
  };

  const checkIfTransactionExist = async () =>{
    try {
          const transactionContract = getEthereumContract();
          const transactionCount = await transactionContract.getTransactionCount;
          window.localStorage.setItem("transactionCount", transactionCount);
      
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  }



  // It will open MetaMask wallet
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamnask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object connectWallet");
    }
  };

  // get All Transection
  const getAllTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install metamnask");
      const transactionContract = getEthereumContract();
      const availableTransactions = await transactionContract.getAllTransaction(); 
      console.log(availableTransactions)

      const structuredTransactions = availableTransactions.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / (10 ** 18)
      }));

      console.log(structuredTransactions);
      setTransactions(structuredTransactions);

    } catch (error) {
      console.log(error)
    }
  }

  // Send Transection
  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const accounts = await ethereum.request({ method: "eth_accounts" }); // get Metamask connected account
        if (accounts.length) {
          console.log("Current account", accounts[0]);
          const { addressTo, amount, keyword, message } = formData;
          if (addressTo === accounts[0]) {
            console.log("Sender and reciver account can not be same");
          } else {
            const transactionContract = getEthereumContract();
            const parsedaAmount = ethers.utils.parseEther(amount);

            // This will just send the ETH amount from one account to other
            await ethereum.request({
              method: "eth_sendTransaction",
              params: [
                {
                  from: currentAccount, // from useState
                  to: addressTo,
                  gas: "0x5208",
                  value: parsedaAmount._hex,
                },
              ],
            });

            // This code is for record maintaine from 1 account to other to store transection.
            const transactionHash = await transactionContract.addToBlockChain(
              addressTo,
              parsedaAmount,
              message,
              keyword
            );
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`);
            setFormData("","","","");
            setIsLoading(false);
            const transactionCount =
              await transactionContract.getTransactionCount();
            setTrasactionCount(transactionCount.toNumber());
          }
        } else {
          console.log("No ethereum objec found connect Your wallet");
        }
      } else {
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object sendTransaction ");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionExist();
  }, [trasactionCount]);

  // wrap entire application to data
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        transactions,
        isLoading
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
