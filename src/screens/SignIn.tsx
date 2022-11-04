import { Center, Text, Icon } from "native-base";
import { Fontisto } from "@expo/vector-icons"

import Logo from '../assets/logo.svg'

import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/Button";
import { useEffect } from "react";

import axios from 'axios'


export function SignIn() {

  const { signIn, isUserLoading } = useAuth()

  useEffect(() => {
    async function teste() {
      const result = await axios.get('https://0.0.0.0:3333/pools')
      console.log()
    }
    teste();
  })

  return (
    <Center flex={1} bgColor='gray.900' paddingX={7}>
      <Logo width={212} height={40} />

      <Button
        type="SECONDARY"
        title="ENTRAR COM GOOGLE"
        leftIcon={<Icon as={Fontisto} name='google' color='white' size='md' />}
        mt={12}
        onPress={signIn}
        isLoading={isUserLoading}
        _loading={{
          _spinner: { color: 'white' }
        }}
      />

      <Text color='white' textAlign='center' mt={4}>
        Não utilizamos nenhuma informação além {'\n'}
        do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  )
}