var express = require('express');
var router = express.Router();
const fs = require("fs");
let voting;
var Rewards = require('../models/rewardSchema');




fs.readFile("./public/votings.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err);
    return;
  }
  try {
    voting = JSON.parse(jsonString);
    //console.log("Customer:", voting); 
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
});

/////////////calculaterewards/////////////////////////////////
let ss = [{
  "_id": "cb7f68eb-e843-499c-a4d2-8e720195975f",
  "data": "[{\"address\":\"hx52a5f71f8f6323adf618362e647f645e786b9b9d\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1800882},{\"address\":\"hx8b6461c87b6990bb60785320aba340cd49f264ab\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":301944.0417},{\"address\":\"hxf63c58966131f9a7b0ee41e94c694f74b5bba6e1\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":295000},{\"address\":\"hx61b8b767fa80abb4459f45518a3247c0ccb1e4b4\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":119777},{\"address\":\"hx4efb481f8cbeb62ce3da6cb5ab4a79413b7406e7\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":112608.3386},{\"address\":\"hx1be60841025db1b22126ba08ba519326603029c9\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":110631},{\"address\":\"hxae8e638319fa9728147a7830c69e856dbde9f71a\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":100000},{\"address\":\"hx726a24ff9d3e7d86bffc2a74d8edca80dd357af9\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":69792.2569},{\"address\":\"hxe87d4d515005ae5f174b7074052df37868665009\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":67380.7497},{\"address\":\"hx7f1f238c9186aba678bf05c6df564d374eee3617\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":58979.4505},{\"address\":\"hx5ca7bf0204fe5a074ee9fc8eef5f1379f4ba2ca5\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":55031},{\"address\":\"hxd13b42187fd9a9de63a6bd1c8f0b760cd465c5c5\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":50150},{\"address\":\"hxa12818d9a8535d8937145548a0e51049dd282b03\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":50075.5623},{\"address\":\"hx4ecf40ccbc51e1f2a3d21a8bda45414add51fd73\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":44866},{\"address\":\"hxcde0b11abbc19ab17182768be08cceab9f682fca\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":38019},{\"address\":\"hx90e0ac2f7a44ff7d3eef5c25c960184080d217b5\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":37885},{\"address\":\"hxb3248187d124c7a63a8517d3de2fb8b40a2e9b52\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":35499.161389940935},{\"address\":\"hx749fc119a7d003a553dbe1a6623a000a222d3ada\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":30022},{\"address\":\"hx8ed99501f9a0f6e20061683f6e461146937f9cd0\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":30002},{\"address\":\"hx92a1e4be91bc099edd24f16d6512d0a853e8ff6a\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":27805},{\"address\":\"hx9041d988a6cc1466b2db13dff186d0a7c48d6b6b\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":26634.494},{\"address\":\"hx03a6688ab037e35b5b0f510593da9738e6199e43\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":25061.3871},{\"address\":\"hxc3c0b26adf6d93b9b0aafe7a4703f777a24b27ea\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":23950},{\"address\":\"hx98d8a822621635fb50f4e0b6ebb2a046c8db0e3a\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":23396},{\"address\":\"hx0b8f90756b8976b34810281e2776266cda6e1471\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":23318.1397},{\"address\":\"hxfd10d36569b826c7075c60a100d82ceb6607cb6f\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":22291},{\"address\":\"hx04c8c5e5f412aa7c1986514bbbef2d269a2733fc\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":20525.162},{\"address\":\"hx257801996fb5d645da86a0f68dd57fa9a82f7c31\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":20522.7718},{\"address\":\"hx0e3e2c3b0232e5db6d7a6df18c6934a3bad9030c\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":18299.3901},{\"address\":\"hx8c2b02e698f093f4f2064f03ee87ca28c20ba1f0\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":17850},{\"address\":\"hxbc0c6a4cb8fd92d3eead636cb821298efd7065c8\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":17192.9888},{\"address\":\"hx0b13694ca847ca2c4d137b3a19fda7a8a9f7611b\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":16313},{\"address\":\"hxf05da1d3b662b134d01d0d724af47d465c849bac\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":15839.6385},{\"address\":\"hxfa68fc7b01b13dbea524f3127c1ee4095ca8dbbd\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":14735},{\"address\":\"hxee5c1d04f36e46fb4a9c5b0de1e0d10b03a8ed9c\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":14001.6692},{\"address\":\"hx0152535a0c28a642edd1207d44f3cbadbd22f867\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":13325.7593},{\"address\":\"hx5a368a16d455b0f7e4ba90324e0384c48c00dab8\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":13315.5231},{\"address\":\"hx9087badbb2ad3914d47551eeeb6816e9e94077e6\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":13232},{\"address\":\"hxa7890ee9b71c2a9c8f438aba863bd2aec0d6f8de\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":12878},{\"address\":\"hx602d61e653c7bc72581e076ede13a18f5ab2f1b0\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":12346.7397},{\"address\":\"hx99c13a65edc4a54233737caad9afcd2f7051111a\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":11000},{\"address\":\"hxcda58658f08995559f80b3625a32ddb42cfae4a3\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":10606},{\"address\":\"hx6af6908bf84ae4df3485b3ebe13afc84060ee1a7\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":10110.4085},{\"address\":\"hxe102dc6eb941d0935a33503fed6d9fe222e3ee8e\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":10052.6531},{\"address\":\"hx681cdca65d2352c553c034b36fb9b4bae5f8aba1\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":10041.5195},{\"address\":\"hxe21d988085be76fe5e759ceb87feb74b6d33ef4c\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":10000},{\"address\":\"hx9ff26f52cf1b6683e0832b2636608fe62a84d0e0\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":10000},{\"address\":\"hx7c1012221112fb031eb036f23216664e1e647f3c\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":10000},{\"address\":\"hx781263969ce8ccb1f5f7e58f35f89dd0e6946d49\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":10000},{\"address\":\"hx7616d8e5a76ac50c883393bd158df54578b61e73\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":10000},{\"address\":\"hx0d1c2c89efc49a7a2870b28b85805627789d21f8\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":10000},{\"address\":\"hx6ab950b636321aec3efe109ad9607bbf263de9ad\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":9999},{\"address\":\"hx038403920b63fdea5849304a0df599dc35dd131a\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":9956.587082517419},{\"address\":\"hxdbc6e171f5cee10f6eb5a15cd7af1eb1c8c69d55\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":9099.4176},{\"address\":\"hx8a9cfc8348ad43593b7becd6f9c154f051722b26\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":8000},{\"address\":\"hx8248262eb9f5d27747bfdbb4059a01bff3106b78\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":7750},{\"address\":\"hxada87743b7f70f28bf61d3c3f9f39da8d87cc5ec\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":7251.236},{\"address\":\"hxfdfefc4558eb6e8bb1075002e0a75408ff51822c\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":7203},{\"address\":\"hx83b2e2bf55f797eba0887a2273b701f3da4fffb7\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":6930},{\"address\":\"hx2d6ceeb021b38d12152a74877e18d8ec353393b1\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":6514},{\"address\":\"hx2ae83c2fd91d2ab5784cd38e8d13c920e13d4af4\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":6500},{\"address\":\"hx9ae36a4bb26d91bd0ed54ad100c6b0a14ecc6207\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":6229},{\"address\":\"hxb58081b31123b99883fe191aaff2873a14d89820\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":6185.17},{\"address\":\"hx757b7f4c2c60b0f2d8b1e69e6c343e0f0b3e5e1c\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":6000},{\"address\":\"hxc446c32156b2689249ca34e5d5d8c0de17e2e90d\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":5600.1794},{\"address\":\"hx75b616e7ae60f93cd36fa3e876c79c1ecad068df\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":5575.6657},{\"address\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":5555},{\"address\":\"hxe9589e864aa97ad8eff5dbf2b6fd087a21d5b8e3\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":5314},{\"address\":\"hxe274e9b3202dc7548e068e57e040047e2b69e041\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":5105.2185},{\"address\":\"hx8ca83085431dcf48aa57a5ee76412475320191ae\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":5015},{\"address\":\"hx052c7eea8ab1d68e7b5582b773481427d4bec919\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":5010.166},{\"address\":\"hxe5d2b665246da2881bee1ae4540fc99aecaa2258\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":5000.224454958338},{\"address\":\"hx8e957dff0fe7ec7464742f9b3e7b7be5db33a0ff\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":5000},{\"address\":\"hx7064eae70f3a12a4f358abbc0059cf87de61c2d8\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":5000},{\"address\":\"hx0de09b846472cb94a415942145b76adc70299360\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":5000},{\"address\":\"hxbf9340b9672bcf6f18c29b0938635c93b39c3533\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":4861.317},{\"address\":\"hxfefad32ff43959a556f9c658fba047bcc41d3fc4\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":4813},{\"address\":\"hxffedb7b17e38c0a8ae9a807fc72b1fdd1d3d0932\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":3430.5578},{\"address\":\"hxae7efb7397172a46e090172179bf08e8be0c0630\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":3420.9011},{\"address\":\"hx59503e32940a85118a073ee9b1ef2e10af90710c\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":3325},{\"address\":\"hx2fb13c9412897e7bc21ce9d24ec980cb4b690a2a\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":3300},{\"address\":\"hx619f0c456172348a0baf619031a6ae4d484c4f09\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":3166.2224},{\"address\":\"hx46fca9671f1811c860bb19d895704ce2ef4171e7\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":3130},{\"address\":\"hxeaf708b437ee8d801e2ccc8310d24e1719f2c81b\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":2819},{\"address\":\"hx73e8d65b413f7ff7cedb0bb6cc9c5fcd40f0eb98\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":2785.7525},{\"address\":\"hx9fd28a12867853323f905abb4f1f27ee19c9b833\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":2776.8835},{\"address\":\"hx4c02c2951ba8e558ffe3e7a1ac395165e3f09260\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":2688.3058},{\"address\":\"hx0be1db23506f97faecb0709e815240cea42afd54\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":2640},{\"address\":\"hx27637e10e9786b7d65a1320a52b4e0c438165ae6\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":2546.8619},{\"address\":\"hxb91b468dd5f019deb5052136d06e30aa081f6982\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":2462.2402},{\"address\":\"hx90ff1fd3644162f9fef74a13d51f0cc58db04fe6\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":2447},{\"address\":\"hxe00c66fa8b5421f232d30c8f9ecb76ddb7b025cc\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":2355.0301},{\"address\":\"hx61d8a4f8fa06d7246798637253920026dc863966\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":2292.0708},{\"address\":\"hx5bfc95ec6cc47af31293272d8c465ace09daea0f\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":2232.0155},{\"address\":\"hx4fbb26fc41bbae48a637f9a7d438f3b4037d3603\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":2065},{\"address\":\"hxe80d4f96a015e869068f641b5969230fd7b1d502\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":2001},{\"address\":\"hxeca28aee7d9666f227d914a37e92780348ec57c4\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":2000},{\"address\":\"hx9c123b436092501a44de9e597d3e7ad586cb1e23\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":2000},{\"address\":\"hxf4bcb1aa59d77278c20eb4300b4c2aca6e0a5646\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1830.0605},{\"address\":\"hxaebb23e9dfb4ea508fe117c2675b733e4dba9bb2\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1816},{\"address\":\"hxfc967eb9a0b86a5cc2c9d807b7d969eb69c537ed\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1720},{\"address\":\"hx592e7959a5c0070cf51f18b82390c2553f0f767a\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1698},{\"address\":\"hx1f96a3befc7b47491a80591d3faa1101cc047f37\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1687.8432},{\"address\":\"hxc09bc9c068cb31adadb69c071ffce2e8d9930200\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1621.0829},{\"address\":\"hx17b803e040b9a199608d2f526d6e6887ad953506\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1618.144},{\"address\":\"hx52b793c039fd02dde34affff7654ed73467df61c\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1609.5},{\"address\":\"hx25c84fc0d9d0fb56eb179291dbc2a331a4e3e93b\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1600},{\"address\":\"hxdce8596e665e1c065dd410b45d14f4a32841bea4\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1517},{\"address\":\"hx3171da3b3a4c5e78d595d768edb00970873e4dab\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1498.2414},{\"address\":\"hx074a718ed981d9fac87ecf8ed86e958fc16b2151\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1314.5049},{\"address\":\"hx8b72f27272dda34213a9390ff37305d89810bd09\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1291.2586},{\"address\":\"hx3f58bdb18ffe94f86dd6619b301519219dd01fb9\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1205.0084},{\"address\":\"hxda93f26fb12647deec2bf4dcb5bd23e0abec3e87\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1198.4},{\"address\":\"hx9213dfd0eba46fefff91b5ddc0ccb105a10c0f70\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1180},{\"address\":\"hxe803351853a2198112bf600a67850bcf46e8b347\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1157.337},{\"address\":\"hxf9f2c3c40263856a5b38b75aae6d300be1215993\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1154},{\"address\":\"hxf25c677bc486d6c2b0469b7f52695e8c38799c4d\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1109.3185},{\"address\":\"hx532e281fa9a0c449480247556347d9d897c28f26\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1029.4818},{\"address\":\"hx8ec60cf0ce44dbfa0c5c87f0c7c04e2b75cc4de8\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1022.9543},{\"address\":\"hx8d432df142d2f6ae5b8870443f8f3d58b7fef240\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1004},{\"address\":\"hx0e711f326375ac6b6e1a509b9e410ea915a75414\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1001},{\"address\":\"hxf4c54bef2f489f42727cf789789811203eb97a26\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1000},{\"address\":\"hx94ddc7d5ffb3902d95bf5e2973113fee6ea8bff2\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1000},{\"address\":\"hxda0c8d3a5434b377d194026b448497f163f5af71\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":960},{\"address\":\"hxe7ac3cddbc151c6bff08a9e9d37cab9467619636\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":912},{\"address\":\"hx58ea6b037c513a177b99f643d58d29c0535eb7ef\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":900.5253},{\"address\":\"hx2516a6d035708ed3a99a5befd7ae206d951d5d03\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":890.0773},{\"address\":\"hx973661a08870351561ba9b43f84341d061affb72\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":810},{\"address\":\"hxb6a82060297a704f43ca4d76b344c907f3d4c96d\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":799},{\"address\":\"hx4c656d7fb50bce06d48de706f993ca3ad4e68e7b\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":799},{\"address\":\"hxdaf3b8bf5844ed3ebf104f2e8f13b4f5ceff2160\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":750},{\"address\":\"hxde8183cb8fdefa2c37d50904aab1c9af5b4fec86\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":700},{\"address\":\"hx00d504b86586d81df048333e00a6010ff632806e\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":644},{\"address\":\"hxc9bb11383e593a06d0b23cf27e25a702f63b1128\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":590},{\"address\":\"hx5560493e8a2da2bd17c3f35472c7628229c8c404\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":562},{\"address\":\"hx1357b5862ab1687945c7e2792ad7f330b39ce3d8\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":548},{\"address\":\"hxc39cbf85a9e188bf8ef7a1c08aae9a833bc6a170\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":531},{\"address\":\"hx57ffc23cfa663d1fee5e901ef919b0d91b7d4b2f\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":516},{\"address\":\"hx4ec564d67d052426c4209291b7d9512b42248099\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":500},{\"address\":\"hx2b25cbcba1bf70e5b459d1ce293a4e763f1f8d48\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":500},{\"address\":\"hx5e68b0b3803ee0da806613ed8dc4df8a2fb9ec9a\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":459},{\"address\":\"hx9a3f92011102bc6e50b6c243502eaad6fd6db8d4\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":418.1361},{\"address\":\"hxa36ef5ebceaa520071674f1be24987ab430ef738\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":400},{\"address\":\"hx421f624fd856517b4478b169c8849d087110ce93\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":374},{\"address\":\"hx48485dfe68165835a17ea8ff4d0fd245a8c06ce8\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":370.6694},{\"address\":\"hxdee86f560ea6fceb1744c62c535c1178b0008160\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":368.9193},{\"address\":\"hx2930d38d6d1ddc3c9cab2aa823b5299a42c39c48\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":350},{\"address\":\"hxaa090f833d9e24db83fcca1fb6f988910d81b2bb\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":254},{\"address\":\"hxd9c56ce59041e0fd1ae216c26ec6c18e4e08bc9e\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":250.1358},{\"address\":\"hxf6f1b802066cb86444fb61d23719e86d47e81672\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":225},{\"address\":\"hx1bb6f65e446282da73168b7b064a05f244c85804\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":201},{\"address\":\"hx640ce9a75a899aa5bc1061e0cedf44b041bebeb6\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":195},{\"address\":\"hxe7d9234348665a612d61d35c99a4f5050d6c504d\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":192},{\"address\":\"hxce7973a821de3c855427758f58e538bf25f20bd9\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":157},{\"address\":\"hxbd12853b752c5b4a859b97746d3a099670d027e2\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":146.4839},{\"address\":\"hxcbf5b67955ea2ee5806d63436e787b5d63d2ab58\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":123},{\"address\":\"hx5acb56f982000c5a927e90f454213ba563d1e827\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":112.4493},{\"address\":\"hx25d96b5ebc9d2e1134fe42ec729c8c004d301a3e\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":112.4465},{\"address\":\"hxe6d57108d46b860756b4e4a80b6a65b52e88d1dd\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":107},{\"address\":\"hx50aef7207f4392ec7cb5249f7714b1f50cc1f4b1\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":107},{\"address\":\"hxd7f7a9b8c4882caa1303ead43936c6292958fada\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":105},{\"address\":\"hxdb711bce8b0c624cf29c0f99a8ce570e847c6f9c\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":103},{\"address\":\"hxa7b4abb217b145e817dd120b113af88c2b938cd0\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":101.9064},{\"address\":\"hx9adc1c1e078a028e74fa1d9c7ae54bbb097be804\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":101},{\"address\":\"hx5f9c112db6af41850fbb7eec03543c47fbb5703d\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":100},{\"address\":\"hxa95a2226cefb603ba43086a83c8abf993ac00f83\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":84.5},{\"address\":\"hx9b14bd9f7de92b3c4bf797054b28dbccab90c026\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":70},{\"address\":\"hx651dd46807d3df37399c4ae2812aef1d8fe7db93\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":57.0721},{\"address\":\"hx4ef08ea410d3f89b75588fe08c1439e467d682a3\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":56},{\"address\":\"hxba7ce095b73e156dcdaa1fdd80f065c88b40a499\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":50},{\"address\":\"hx541350746e2319b1c54fd929575cd280552b4f9b\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":50},{\"address\":\"hx7c5d2045cfc74eb7f25635a9edd3cca7e4e005c5\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":42.3344},{\"address\":\"hx835c29156128ad6f80992af5b0fac55764169fed\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":41.8914},{\"address\":\"hx317cc737f55e11c045d3a171086861c839747036\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":41.6011},{\"address\":\"hxd2afdd069e51290fc558aaca94405246a96cd255\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":41.3215},{\"address\":\"hx3f133cdf56a93b43bca05939d12d4996a98996ab\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":35.725},{\"address\":\"hx252b2c6f0e31e68fce29504896c16d0bece9fcab\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":30.1593},{\"address\":\"hx68c82e0d9a26f4d6f4ee095ac8981f64ed9ba152\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":29.4116},{\"address\":\"hxb7a130403368d28a2173d68b2e192bfd24a80954\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":27.5954},{\"address\":\"hx633bc49f857126a4efca841bf5284671d75852e6\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":21},{\"address\":\"hx5584b84604bb794a593ce8cf63e86d66f2d2c986\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":19},{\"address\":\"hxa5d8f55b368af815dd83a2eab42a4238f1d931a5\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":11},{\"address\":\"hx58506a374c8ab542ecf697ebfce68f10ea347762\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":10.6616},{\"address\":\"hxd416d5495f1d1e484f70df6384a32e3fa298d7f1\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":10},{\"address\":\"hx0ba54fd50ea61f4fc417075bb5ba2e3e158032b8\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":10},{\"address\":\"hx28ba7c15b6857c1448f0b6c0f43f07aeb6f2df69\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":9},{\"address\":\"hx8471d3f1ece183b5000b76be150b350d8a5845c7\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":8},{\"address\":\"hx8175fd02e1a6cdc86441cb6d1e1a5c0b22f91ca8\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":8},{\"address\":\"hxfea8185bc399578344cf898f8c6272777a6fe051\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":7.9916},{\"address\":\"hx888aec85d108ed4efbd05e2f534446ea0a3ffdee\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":7},{\"address\":\"hxed2968e3862c84455abd00a9a74fe1c6de27cc59\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":6.6929},{\"address\":\"hxe6017904e1e6b80ba125f22a5a325f39ae681e6b\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":6.3947},{\"address\":\"hxe2502e246c29e4067fe98766c4d7327d38c44f35\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":6},{\"address\":\"hxab5f8ee57e78097c4b6f1d9a859566d670925147\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":6},{\"address\":\"hx6cc80b61f210191e982b013cafa83fe7c91f0cfd\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":5.8688},{\"address\":\"hxe35cd81a9ac66cf606fbd576bedbc7281223968e\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":5},{\"address\":\"hx66cde8a9b27840495f7d1221652755540bb60f64\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":5},{\"address\":\"hx9224b16717995c1628d7cb4bb084d3611eaedbe7\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":4},{\"address\":\"hx83fba0783af2849be2f1f03ecbd6197e385275f3\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":3.0225},{\"address\":\"hxdff5285260abcfa6e81dab94b73637239c20ddfb\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":3},{\"address\":\"hx232ccd1717018e873ce6a37ae34c18d191bf1c68\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1},{\"address\":\"hxb9c3b9d993414b5274b7f2a55d20e83aca426e36\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":1.1145801230517454},{\"address\":\"hx2d70ee39d909a3ed2a4130667a40f5d8fde04b49\",\"prep\":\"hx3c58970034d5a923aa95058365450feed28979a2\",\"amount\":3}]",
  "createdAt": {
    "$date": "2021-11-10T05:05:13.457Z"
  },
  "updatedAt": {
    "$date": "2021-11-10T05:05:13.457Z"
  }
}];



let processUserStakingLog = (reward, timeStamp, snapShot) => {
  let userReward = [];
  const parsedSummary = { maxThresholdLog: 0, totalUser: 0, userList: {}};
  snapShot.forEach((snapData, index) => {
      if(new Date(snapShot[index].updatedAt).getUTCHours() != new Date(snapData.updatedAt).getUTCHours()){
          let data = JSON.parse(snapData.data);
          data.forEach(obj => {
              if(!parsedSummary.userList[obj.address]){
                  parsedSummary.userList[obj.address] = {
                      address: obj.address,
                      amountStaked: obj.amount,
                      omm_balance: obj._amount_breakdown ? obj._amount_breakdown.omm_amount : 0,
                      sumOfAllLoggedAmount: obj.amount,
                      totalLogs: 1
                  };
                  parsedSummary.totalUser += 1;
              }
              else{
                  parsedSummary.userList[obj.address]['amountStaked'] = obj.amount;
                  parsedSummary.userList[obj.address]['sumOfAllLoggedAmount'] += obj.amount;
                  parsedSummary.userList[obj.address]['omm_balance'] = obj._amount_breakdown ? obj._amount_breakdown.omm_amount : 0;
                  parsedSummary.userList[obj.address]['totalLogs'] += 1;
              }
              parsedSummary.maxThresholdLog =
                  parsedSummary.maxThresholdLog < parsedSummary.userList[obj.address]['totalLogs']
                  ? parsedSummary.userList[obj.address]['totalLogs']
                  : parsedSummary.maxThresholdLog;
          });
      }
  });
  const userList = Object.keys(parsedSummary.userList);
  let totalAvgAmount = 0;
  userList.forEach(key => {
      let avg = parsedSummary.userList[key]['sumOfAllLoggedAmount'] / parsedSummary.maxThresholdLog;
      parsedSummary.userList[key]['avgAmount'] = avg;
      totalAvgAmount += avg;
  });
  parsedSummary['totalAvgAmount'] = totalAvgAmount;

  userList.map(key => {
      parsedSummary.userList[key]['gg_reward'] = parseFloat(
          ((parsedSummary.userList[key]['avgAmount'] / totalAvgAmount) * reward).toPrecision(15)
      );
      let foundUser = userReward.find(x => x._id == key);
      if(foundUser){
          let foundDate = false;
          foundUser['total_balance'] = parsedSummary.userList[key]['amountStaked'];
          foundUser['omm_balance'] = 0;
          foundUser['omm_balance'] = parsedSummary.userList[key]['omm_balance'];
          const start_date = timeStamp;
          const DateString = `${new Date(timeStamp).getUTCFullYear()}-${new Date(timeStamp).getUTCMonth() + 1}`;
          foundUser['reward_logs'].forEach(rwl => {
            if (foundUser.date_stamp == DateString) {
              foundDate = true;
              rwl.total_snapshots += 1;
              rwl.last_updated_at = timeStamp;
              rwl.balance = parsedSummary.userList[key]['amountStaked'];
              rwl.gg_reward += parsedSummary.userList[key]['gg_reward'];
            }
          });
          if (!foundDate) {
            foundUser['reward_logs'].push({
              date_stamp: DateString,
              start_date: start_date,
              last_updated_at: start_date,
              total_snapshots: 1,
              balance: parsedSummary[0].usersList[key]['amountStaked'],
              gg_reward: parsedSummary[0].usersList[key]['gg_reward'],
            });
          }
      }
      else{
          userReward.push({
              _id: key,
              total_gg_reward: 0.0,
              total_balance: parsedSummary.userList[key]['amountStaked'],
              omm_balance: parsedSummary.userList[key]['omm_balance'],
              reward_logs: [
                {
                  date_stamp: `${new Date(timeStamp).getUTCFullYear()}-${new Date(timeStamp).getUTCMonth() + 1}`,
                  start_date: timeStamp,
                  last_updated_at: timeStamp,
                  balance: parsedSummary.userList[key]['amountStaked'],
                  total_snapshots: 1,
                  gg_reward: parsedSummary.userList[key]['gg_reward'],
                },
              ]
          });
      }
  });
  userReward = userReward.map(user => {
      user.total_gg_reward = user.reward_logs.reduce((prev, curr) => {
          return prev + curr.gg_reward;
      }, 0);
      return user;
  });

  return userReward;
}


let userReward = processUserStakingLog(10000000, 1646977722, ss);

///////////////////////////////////////
//console.log(userReward[0]);



// sendData(userReward);

// function sendData(userReward){
//   var reward = new Rewards
//     ({
      
//         _id: userReward[0]._id,
//         total_gg_reward: userReward[0].total_gg_reward,
//         total_balance: userReward[0].total_balance,
//         omm_balance: userReward[0].omm_balance,
//         reward_logs: userReward[0].reward_logs
//       }
      
      
//     )
//   //var promise = reward.save()
//   console.log("reward", reward)


// }




/* GET home page. */
// router.get('/voting', function(req, res, next) {
//   res.json(voting);
// });

// router.get('/userReward', function(req, res, next) {
//   res.json(userReward);
// });

module.exports = {indexRouter:router,userReward};

