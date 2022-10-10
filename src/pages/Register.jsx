import {
  Box,
  Button,
  Center,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useNavigate } from "react-router-dom";
import { register } from "../actions/useractions";
import { Layout } from "../Components/Layout";

export default function Registerpage() {
  const [obj, setObj] = useState({
    FirstName: "",
    Email: "",
    Password: "",
    LastName: "",
    MobileNo: "",
  });
  function handleChange(e) {
    const value = e.target.value;
    setObj({
      ...obj,
      [e.target.name]: value,
    });
  }
  const navigate = useNavigate();
  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(register(obj));
  };
  if (error) {
    <Stack spacing={3}>
      <Alert status="error" variant="solid">
        <AlertIcon />
        There was an error processing your request
      </Alert>
    </Stack>;
  }

  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Register
      </Heading>

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
        <chakra.form onSubmit={submitHandler}>
          <Stack spacing="6">
            <FormControl id="email" isRequired>
              <FormLabel>email</FormLabel>
              <Input
                name="Email"
                type="email"
                required
                value={obj.Email}
                placeholder="Enter Email"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="name" isRequired>
              <FormLabel>FirstName</FormLabel>
              <Input
                name="FirstName"
                type="text"
                required
                value={obj.FirstName}
                placeholder="Enter First Name"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>LastName</FormLabel>
              <Input
                name="LastName"
                type="text"
                required
                value={obj.LastName}
                placeholder="Enter last Name"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                name="Password"
                type="password"
                autoComplete="password"
                required
                value={obj.Password}
                placeholder="atleat 5 digits/characters"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="MobileNo" isRequired>
              <FormLabel>MobileNo</FormLabel>
              <Input
                name="MobileNo"
                type="mobilenumber"
                autoComplete="number"
                required
                value={obj.MobileNo}
                placeholder="atleat 5 digits/characters"
                onChange={handleChange}
              />
            </FormControl>

            <Button type="submit" colorScheme="pink" size="lg" fontSize="md">
              {loading ? <Spinner color="white.500" /> : "Sign up"}
            </Button>
          </Stack>
        </chakra.form>
      </Box>

      <Center my={4}>
        <Button variant="link" onClick={() => navigate("/login")}>
          Login
        </Button>
      </Center>
    </Layout>
  );
}
