import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { Phone } from "lucide-react";

const snsClient = new SNSClient({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export const sendOTP = async (phone: string, otp: string) => {
  const params = {
    Message: `Your OTP is ${otp}. Do not share it with anyone.`,
    // TopicArn: process.env.NEXT_PUBLIC_AWS_SNS_TOPIC_ARN, // Topic ARN from AWS
    PhoneNumber: phone,
    MessageAttributes: {
      "AWS.SNS.SMS.SMSType": {
        DataType: "String",
        StringValue: "Transactional", // Ensures OTP delivery
      },
    },
  };

  try {
    await snsClient.send(new PublishCommand(params));
    console.log(`OTP sent to ${phone}`);
    return true;
  } catch (error) {
    console.error("SNS Error:", error);
    return false;
  }
};


