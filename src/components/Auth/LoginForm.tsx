'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button, Card, PasswordInput, TextInput } from '@mantine/core';
import { useState } from 'react';

export function LoginForm() {
	const auth = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = () => {
		auth.login({ email, password }, () => {
			setError('Nom or Password is invalid');
		});
	};

	return (
		<Card withBorder shadow="md" p={30} mt={30} radius="md">
			<form onSubmit={handleSubmit}>
				<TextInput
					label="Email"
					placeholder="test@exemple.com"
					onChange={e => setEmail(e.target.value)}
					required
				/>
				<PasswordInput
					label="Mot de passe"
					placeholder="Mot de passe"
					onChange={e => setPassword(e.target.value)}
					required
					mt="md"
				/>

				<Button
					loading={auth?.isPending}
					onClick={() => handleSubmit()}
					fullWidth
					mt="md"
					size="sm"
				>
					Se connecter
				</Button>
			</form>
		</Card>
	);
}
