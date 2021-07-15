import {
	Box,
	Button,
	Flex,
	HStack,
	Icon,
	Input,
	Portal,
	Stack,
	Text,
} from "@chakra-ui/react";
import firebase from "firebase";
import React, { ChangeEvent, useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
} from "@chakra-ui/react";
import { DeleteIcon, WarningIcon } from "@chakra-ui/icons";

import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	PopoverArrow,
	PopoverCloseButton,
} from "@chakra-ui/react";
export default function Home() {
	const [todoInput, setTodoInput] = useState(" ");
	const [name, setName] = useState(" ");
	const [editInput, setEditInput] = useState(" ");
	const [editName, setEditName] = useState(" ");
	const [todos, setTodos] = useState<any[]>([] as any);
	const [isEdit, setIsEdit] = useState<string>("");
	const initRef = React.useRef();

	useEffect(() => {
		getTodos();
	}, []);

	function getTodos() {
		db.collection("list").onSnapshot((querySnapshot) => {
			setTodos(
				querySnapshot.docs.map((doc) => ({
					id: doc.id,
					name: doc.data().name,
					responsible: doc.data().responsible,
				}))
			);
		});
	}

	function addTodo(e: any) {
		e.preventDefault();

		db.collection("list").add({
			name: todoInput,
			responsible: name,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		setTodoInput(" ");
		setName(" ");
	}

	function editItem(id: any) {
		db.collection("list").doc(id).update({
			name: editInput,
			responsible: editName,
		});
	}
	function removeItem(id: any) {
		db.collection("list").doc(id).delete();
	}

	const TheadR = () => (
		<Tr>
			<Th>Item</Th>
			<Th>Responsável</Th>
			<Th></Th>
		</Tr>
	);

	return (
		<Flex align="center" justify="center" direction="column" h="100vh">
			<Box
				px={["10px", "0"]}
				textAlign="center"
				w="100%"
				maxW="800px"
				h="100%"
				maxH="600px"
			>
				<Text as="i" fontWeight="bold" fontSize="xl">
					Lista da Festa do milho
				</Text>
				<Flex my="5">
					<Stack w="100%" direction={["column", "row"]} align="flex-end">
						<FormControl id="item">
							<FormLabel>Nome do item</FormLabel>
							<Input
								value={todoInput}
								placeholder='Ex. "Milho"'
								name="todos"
								onChange={(v) => setTodoInput(v.target.value)}
							/>
						</FormControl>
						<FormControl id="responsible">
							<FormLabel>Responsavel</FormLabel>
							<Input
								value={name}
								placeholder="Responsável"
								name="name"
								onChange={(v) => setName(v.target.value)}
							/>
						</FormControl>

						<Box>
							<Button disabled={todoInput.length < 3} onClick={addTodo}>
								Add
							</Button>
						</Box>
					</Stack>
				</Flex>

				{todos.length ? (
					<Table variant="simple" size="sm">
						<Thead>
							<TheadR />
						</Thead>

						<Tbody>
							{todos
								.sort((a, b) => a.name.localeCompare(b.name))
								.map(
									(v: {
										name: string;
										responsible: string;
										id: any;
									}) => {
										return (
											<Tr key={v.id}>
												<Td>
													{" "}
													{isEdit === v.id ? (
														<Input
															size="sm"
															value={editInput}
															name="todos"
															onChange={(v) =>
																setEditInput(v.target.value)
															}
														/>
													) : (
														v.name
													)}
												</Td>
												<Td>
													{" "}
													{isEdit === v.id ? (
														<Input
															size="sm"
															value={editName}
															name="todos"
															onChange={(v) =>
																setEditName(v.target.value)
															}
														/>
													) : (
														v.responsible
													)}
												</Td>
												<Td isNumeric>
													<HStack justify="flex-end">
														{isEdit === v.id ? (
															<Button
																size="sm"
																colorScheme="whatsapp"
																onClick={() => {
																	editItem(v.id);
																	setIsEdit("");
																}}
															>
																Salvar
															</Button>
														) : (
															<Button
																size="sm"
																colorScheme="facebook"
																variant="outline"
																onClick={() => {
																	setIsEdit(v.id);
																	setEditInput(v.name);
																	setEditName(v.responsible);
																}}
															>
																Editar
															</Button>
														)}
														<Flex>
															<Popover
																closeOnBlur={false}
																placement="left"
																initialFocusRef={initRef as any}
															>
																{({ isOpen, onClose }) => (
																	<>
																		<PopoverTrigger>
																			<Button
																				colorScheme="red"
																				size="sm"
																			>
																				<Icon
																					as={DeleteIcon}
																				/>
																			</Button>
																		</PopoverTrigger>
																		<Portal>
																			<PopoverContent w="200">
																				<PopoverHeader>
																					Tem certeza?
																				</PopoverHeader>
																				<PopoverCloseButton />
																				<PopoverBody>
																					<HStack
																						align="center"
																						justify="flex-end"
																					>
																						<Button
																							size="sm"
																							onClick={
																								onClose
																							}
																							ref={
																								initRef as any
																							}
																						>
																							Cancelar
																						</Button>
																						<Button
																							size="sm"
																							colorScheme="red"
																							onClick={() => {
																								removeItem(
																									v.id
																								);
																								onClose();
																							}}
																							ref={
																								initRef as any
																							}
																						>
																							Apagar
																						</Button>
																					</HStack>
																				</PopoverBody>
																			</PopoverContent>
																		</Portal>
																	</>
																)}
															</Popover>
														</Flex>
													</HStack>
												</Td>
											</Tr>
										);
									}
								)}
						</Tbody>
						<Tfoot>
							<TheadR />
						</Tfoot>
					</Table>
				) : (
					<Flex direction="column" justify="center" align="center">
						<Icon as={WarningIcon} w={6} h={6} />
						<Text>Sem items</Text>
					</Flex>
				)}
			</Box>
		</Flex>
	);
}
