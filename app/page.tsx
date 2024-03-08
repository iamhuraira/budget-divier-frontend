'use client'
import React, { useState } from 'react'
import { Formik } from 'formik'
import { useRequestProcessor } from '@/requestProcessor'
import axiosClient from '../axios'
import * as Yup from 'yup'

const loginSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string().required('Password is required')
})

export default function Login() {
	const [isValid, setIsValid] = useState<boolean>(false);
	const { mutate } = useRequestProcessor()

	const { mutateAsync: loginUser } = mutate('login', async (values: any) => {
		try {
			const response = await axiosClient.post('/auth/signin', values)
			const data = response.data
			console.log('data', data)
		} catch (error) {
			console.log('error', error)
		}
	})

	const handleLogin = async (values: any) => {
		console.log('values', values)
		try {
			console.log('values', values)
			const data = await loginUser(values)
			console.log('data', data)
		} catch (error) {
			console.log('error', error)
		}
	}

	return (
		<Formik
			initialValues={{
				email: '',
				password: ''
			}}
			validationSchema={loginSchema}
			onSubmit={handleLogin}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				setFieldTouched,
				isValid: isformValid,
				handleSubmit
			}) => (
				<div className="flex justify-center items-center h-[100vh] w-full bg-gray-200">
					<div className=" w-[500px] p-8 rounded bg-white shadow-lg">
						<h1 className="mb-6 text-center text-2xl font-bold text-black">Login</h1>
						{errors.email && touched.email ? (
							<h2 className="text-red-500 mb-6">{errors.email}</h2>
						) : errors.password && touched.password ? (
							<h2 className="text-red-500 mb-6">{errors.password}</h2>
						) : null}
						<div className="mb-8 text-black" >
							<input
								className="w-full h-10 border border-gray-300 px-4 mb-4 rounded"
								placeholder="Email address"
								value={values.email}
								onChange={handleChange( 'email' )}
								onBlur={() => setFieldTouched( 'email' )}
								autoCapitalize="none"
							/>
							<input
								className="w-full h-10 border border-gray-300 px-4 rounded"
								placeholder="Password"
								value={values.password}
								onChange={handleChange( 'password' )}
								onBlur={() => setFieldTouched( 'password' )}
							/>
						</div>
						<button
							className={'w-full bg-indigo-600 py-3 rounded cursor-pointer'}
							onClick={() => handleSubmit()}
						>
							<h1 className="text-white text-center text-lg font-bold">Login</h1>
						</button>
					</div>
				</div>
			)}
		</Formik>
	)
}
