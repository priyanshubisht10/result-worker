interface Submission {
   questionId: string;
   studentId: string;  //studentid here is rollno
   signedMessage: {
      submittedOption: string,
      signature: Uint8Array,
   },
   time: Date
}

export default Submission;