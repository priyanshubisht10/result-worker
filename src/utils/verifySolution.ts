import Submission from "../interfaces/submission";
import Key from "../models/keyModel";
import AppError from "./appError";
import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import { decodeUTF8 } from "tweetnacl-util";

async function verifySolution(submission: Submission) {
   // retrieve the public key from the DB using the student ID
   console.log(submission);
   const key = await Key.findOne({rollNo: submission.studentId});

   if(!key) {
      throw new AppError('Could not find roll no in the DB', 500);
   }

   // console.log(key.publicKey);

   //verify the submittedOption and signature with the help of the retrived public key 
   
   const publicKeyObj = new PublicKey(key.publicKey);
   const signatureArray = new Uint8Array(Object.values(submission.signedMessage.signature));

   // console.log(signatureArray);
   // console.log(decodeUTF8(submission.signedMessage.submittedOption));

   const result: boolean = nacl.sign.detached.verify(
      decodeUTF8(submission.signedMessage.submittedOption),
      signatureArray,
      publicKeyObj.toBytes(),
   );
   console.log(result);

   //if any of the operation fails, push it to the dead letter queue.

   if(result === null) {
      
   }

   return result;
   
}

export default verifySolution;

// {
//    "status": "success",
//    "data": {
//        "studentId": "1234",
//        "signedMessage": {
//            "submittedOption": "HellooiSNFnzdlgrbdo;gslafn",
//            "signature": {
//                "0": 195,
//                "1": 160,
//                "2": 34,
//                "3": 244,
//                "4": 217,
//                "5": 217,
//                "6": 111,
//                "7": 35,
//                "8": 247,
//                "9": 228,
//                "10": 221,
//                "11": 41,
//                "12": 180,
//                "13": 18,
//                "14": 117,
//                "15": 243,
//                "16": 70,
//                "17": 126,
//                "18": 191,
//                "19": 33,
//                "20": 32,
//                "21": 239,
//                "22": 64,
//                "23": 86,
//                "24": 142,
//                "25": 0,
//                "26": 35,
//                "27": 210,
//                "28": 83,
//                "29": 58,
//                "30": 41,
//                "31": 106,
//                "32": 0,
//                "33": 175,
//                "34": 198,
//                "35": 15,
//                "36": 195,
//                "37": 86,
//                "38": 38,
//                "39": 124,
//                "40": 161,
//                "41": 103,
//                "42": 245,
//                "43": 210,
//                "44": 200,
//                "45": 61,
//                "46": 114,
//                "47": 234,
//                "48": 77,
//                "49": 114,
//                "50": 251,
//                "51": 55,
//                "52": 28,
//                "53": 194,
//                "54": 224,
//                "55": 194,
//                "56": 168,
//                "57": 127,
//                "58": 134,
//                "59": 156,
//                "60": 192,
//                "61": 177,
//                "62": 19,
//                "63": 2
//            }
//        },
//        "time": "2024-09-25T11:03:16.830Z"
//    }
// }