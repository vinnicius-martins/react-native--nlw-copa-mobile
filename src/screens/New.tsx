import { useState } from 'react'

import Logo from '../assets/logo.svg'

import { Heading, Text, VStack, useToast } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function New() {
  const toast = useToast();

  const [title, setTitle] = useState('')

  async function handleCreatePool() {
    if (!title) {
      return toast.show({
        title: 'Informe um nome para o seu bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title="Criar novo bolão"/>

      <VStack mt={8} mx={5} alignItems='center'>
        <Logo />

        <Heading fontFamily='heading' color='white' fontSize='xl' my={8} textAlign='center'>
          Crie seu próprio bolão da copa {'\n'}
          e compartilhe entre amigos!
        </Heading>

        <Input
          mb={2}
          placeholder="Qual nome do seu bolão?"
          onChangeText={setTitle}
          value={title}
        />

        <Button
          title="Criar meu bolão"
          onPress={handleCreatePool}
        />

        <Text color='gray.200' fontSize='sm' textAlign='center' px={10} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  )
}
