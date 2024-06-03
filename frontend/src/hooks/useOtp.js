import { useQuery } from "@tanstack/react-query";
import { sendOtp } from "../api/api";

export const sendOtpMobile = (num) => {
  const number = "+91" + num;
  return useQuery({
    queryKey: ["number", num],
    queryFn: () => sendOtp({ number }),
    enabled: false,
  });
};
