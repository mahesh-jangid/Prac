import {
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { Redirect } from "react-router-dom";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signin } from "../actions/useractions";
import { Layout } from "../Components/Layout";
import { AuthContext } from "../Context/AuthContext";

export default function Loginpage() {
  const navigate = useNavigate();
  const toast = useToast();

  const [obj, setObj] = useState({
    EmailOrMobileNo: "",
    Password: "",
  });
  function handleChange(e) {
    const value = e.target.value;
    setObj({
      ...obj,
      [e.target.name]: value,
    });
  }
  // const [EmailOrMobile, setEmailOrMobile] = useState("");
  // const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { isAuth } = useContext(AuthContext);
  const { loading, userInfo, error, isLoggedIn } = userSignin;
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(userInfo);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!obj.EmailOrMobileNo || !obj.Password) {
      toast({
        description: "Please enter credientials",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      dispatch(signin(obj));
    }
  };
  if (error) {
    <Stack spacing={3}>
      <Alert status="error" variant="solid">
        <AlertIcon />
        There was an error processing your request
      </Alert>
    </Stack>;
  } else {
    return (
      <Layout>
        <Heading textAlign="center" my={12}>
          Login
        </Heading>

        <Box
          py="8"
          px={{ base: "4", md: "10" }}
          shadow="base"
          rounded={{ sm: "lg" }}
          maxW="md"
          mx="auto"
          mt={4}
        >
          <chakra.form onSubmit={submitHandler}>
            <Stack spacing="6">
              <FormControl>
                <FormLabel>Email Or MobileNo</FormLabel>
                <Input
                  name="EmailOrMobileNo"
                  type="text"
                  autoComplete="text"
                  required
                  value={obj.EmailOrMobileNo}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email Or MobileNo</FormLabel>
                <Input
                  name="Password"
                  type="text"
                  autoComplete="text"
                  required
                  value={obj.Password}
                  onChange={handleChange}
                />
              </FormControl>

              <Button type="submit" colorScheme="pink" size="lg" fontSize="md">
                {loading ? <Spinner color="white.500" /> : "Sign In"}
              </Button>
              <Button
                type="submit"
                colorScheme="pink"
                size="lg"
                fontSize="md"
                onClick={() => navigate("/forgotpassword")}
              >
                forgot password
              </Button>
            </Stack>
          </chakra.form>
          <HStack justifyContent="space-between" my={4}>
            <Button variant="link" onClick={() => navigate("/register")}>
              Register
            </Button>
          </HStack>
        </Box>
      </Layout>
    );
  }
}
