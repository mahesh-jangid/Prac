import React from "react";
import { Flex, FormControl, ChakraProvider, theme } from "@chakra-ui/react";
import { OTPInput } from "chakra-otp-input";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../Components/Layout";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
const OTP = () => {
  const navigate = useNavigate();
  const [otp, setotp] = useState();
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log(userInfo);
  const toast = useToast();

  const handleOTPInput = (value) => {
    console.log(value);
    setotp(value);
  };
  const submitOTP = async () => {
    const data = await Axios.post(
      "https://qaapi.jahernotice.com/Admin/OTP/verify",
      {
        Id: userInfo?.data?.recordsets[0]?.ID,
        OTP: otp,
      }
    );
    console.log(data);
    if (data.data.isActive) {
      navigate("/login");
    } else {
      toast({
        description: "Invalid OTP",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  console.log(otp);
  return (
    <Layout>
      <Box
        bg={useColorModeValue("white", "gray.700")}
        py="8"
        px={{ base: "4", md: "10" }}
        shadow="base"
        rounded={{ sm: "lg" }}
        maxW="md"
        mx="auto"
        mt={4}
      >
        {" "}
        <ChakraProvider theme={theme}>
          <Stack spacing="6">
            {" "}
            <Flex pt="48" justify="center" align="center" w="full">
              <FormControl w="60">
                <FormLabel>Enter OTP</FormLabel>

                <OTPInput noInputs={6} onChange={handleOTPInput} />
              </FormControl>
            </Flex>
            <Button
              type="submit"
              colorScheme="pink"
              size="lg"
              fontSize="md"
              onClick={submitOTP}
            >
              Submit
            </Button>
            <Button type="submit" colorScheme="red" size="lg" fontSize="md">
              Re-send OTP
            </Button>
          </Stack>
        </ChakraProvider>
      </Box>
    </Layout>
  );
};
// const OTP = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const userSignin = useSelector((state) => state.userSignin);
//   const { isAuth } = useContext(AuthContext);
//   const { loading, userInfo, error, isLoggedIn } = userSignin;
//   const dispatch = useDispatch();
//   const location = useLocation();
//   console.log(userInfo);
//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(signin(name));
//   };

//   return isAuth ? (
//     navigate("/dashboard")
//   ) : (
//     <Layout>
//       <Heading textAlign="center" my={12}>
//         Login
//       </Heading>

//       <Box
//         py="8"
//         px={{ base: "4", md: "10" }}
//         shadow="base"
//         rounded={{ sm: "lg" }}
//         maxW="md"
//         mx="auto"
//         mt={4}
//       >
//         <PinInput otp>
//           <PinInputField />
//           <PinInputField />
//           <PinInputField />
//           <PinInputField />
//         </PinInput>
//         <chakra.form onSubmit={submitHandler}>
//           <Stack spacing="6">
//             <FormControl id="name">
//               <FormLabel>Enter OTP</FormLabel>
//               <Input
//                 name="name"
//                 type="text"
//                 autoComplete="text"
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </FormControl>

//             <Button type="submit" colorScheme="pink" size="lg" fontSize="md">
//               Submit
//             </Button>
//             <Button type="submit" colorScheme="pink" size="lg" fontSize="md">
//               Resend OTP
//             </Button>
//           </Stack>
//         </chakra.form>
//       </Box>
//     </Layout>
//   );
// };

export default OTP;
