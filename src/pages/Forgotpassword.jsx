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

import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { Layout } from "../Components/Layout";
import Axios from "axios";
const Forgotpassword = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [Email, setEmail] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await Axios.post(
        "https://qaapi.jahernotice.com/Admin/Password/send",
        {
          Email,
        }
      );
      toast({
        description: `New password sent to ${Email}`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
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
              <FormLabel>Email</FormLabel>
              <Input
                name="Email"
                type="email"
                autoComplete="text"
                required
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <Button type="submit" colorScheme="pink" size="lg" fontSize="md">
              Submit
            </Button>
          </Stack>
        </chakra.form>
        <HStack justifyContent="space-between" my={4}>
          <Button variant="link" onClick={() => navigate("/regloginister")}>
            Login
          </Button>
        </HStack>
      </Box>
    </Layout>
  );
};

export default Forgotpassword;
