const ethers = require('ethers');
const express = require('express');
const compression = require('compression');



const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(compression());



const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const ABI = [
  'function createShopProduct(string memory name, uint price, string memory description) public' ,
    'function purchasedShopProduct(uint _id) public payable'
];

const provider = ethers.getDefaultProvider('ropsten');
const privateKey = process.env.OWNER_ADDRESS;


app.post('/createShopProduct', async (req, res) => {
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
    
    const{productName,price,desc} = req.body;

  try{

    const result = await contract.createShopProduct(productName,parseInt(price),desc);

    res.json({ 
      status: result
     });
  }catch(e){
    console.log(e);

    res.json(
      e
    );
  }
});

app.post('/purchasedShopProduct', async (req, res) => {

    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

    const{id} = req.body;

  try{

    const result = await contract.purchasedShopProduct(parseInt(id));

    res.json({ 
      status: result
     });
  }catch(e){
    res.json(
      e
    );
  }
});


app.get('/', async (req, res) => {
    // const wallet = new ethers.Wallet(privateKey, provider);
    // const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
    
    // const{productName,price,desc} = req.body;

  try{

    // const result = await contract.createShopProduct(productName,parseInt(price),desc);

    res.json({ 
      status: "Hello"
     });
  }catch(e){
    console.log(e);

    res.json(
      e
    );
  }
});




app.listen(8080);
