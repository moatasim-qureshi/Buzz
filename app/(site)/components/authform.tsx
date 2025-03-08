'use client';


import Button from "@/app/components/buttons";
import Input from "@/app/components/inputs/inputs";
import {useCallback, useEffect, useState} from "react";
import {FieldValues, useForm, SubmitHandler} from "react-hook-form"
import AuthSocailButton from "./AuthSocailButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

type Variant = 'LOGIN' | 'REGISTER' ;

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant,setVariant] = useState<Variant>('LOGIN');
    const [isloading,setLoading] = useState(false);

    useEffect(() => {
        if(session?.status === 'authenticated'){
            router.push('/users');
        }
    }, [session?.status, router])


    const toggleVariant = useCallback(() => {
        if(variant === 'LOGIN'){
            setVariant('REGISTER');
        } else{
            setVariant('LOGIN');
        }
    }, [variant])


    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);

        if(variant === 'REGISTER'){
            axios.post('/api/register',data)
            .then(() => signIn('credentials',data))
            .catch(() => toast.error('Something went Wromg'))
            .finally(() => setLoading(false))

        } 
        if(variant === 'LOGIN'){
            //NextAuth Signin
            signIn('credentials',{
                ...data,
                redirect: false
            })
            .then((callback) => {
                if(callback?.error){
                    toast.error('Invalid Credentials');
                }
                if(callback?.ok && !callback?.error){
                    toast.success('Logged In')
                    router.push('/users');
                }
            })
            .finally(() => setLoading(false))
        }
    }
    
    const socialAction = (action: string) => {
        setLoading(true);
        signIn(action,{redirect: false})
        .then((callback) => {
            if(callback?.error){
                toast.error('Invalid Credentials');
            }
            if(callback?.ok && !callback?.error){
                toast.success('Logged In')
            }
        })
        .finally(() => setLoading(false))        
    }

    return(
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant === 'REGISTER' && (

                    <Input id="name" 
                    label="Name" 
                    register={register}
                    errors={errors}
                    disabled={isloading}    
                    />
                )} 

                    <Input id="email" 
                        label="Email address"
                        type="email" 
                        register={register}
                        errors={errors}
                        disabled={isloading}/>

                    <Input id="password" 
                        label="Password"
                        type="password" 
                        register={register}
                        errors={errors}
                        disabled={isloading}/>
                    <div>
                        <Button
                        disabled={isloading}
                        fullWidth
                        type="submit"

                        >
                        {variant === 'LOGIN' ? 'Sign In' : 'Register'}


                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="
                            absolute
                            inset-0
                            flex
                            items-center
                        ">
                            <div className="
                                w-full 
                                border-t
                             border-gray-300"
                            />

                        </div>

                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white text-gray-500">
                                Or continue with

                            </span>

                        </div>

                    </div>
                    <div className="mt-6 flex gap-2">
                        <AuthSocailButton
                            icon = {BsGithub}
                            onClick={() => socialAction('github')} 
                        />
                        <AuthSocailButton
                            icon = {BsGoogle}
                            onClick={() => socialAction('google')} 
                        />

                    </div>
                </div>

                <div className="
                    flex
                    gap-2
                    justify-center
                    text-sm
                    mt-6
                    px-2
                    text-gray-500
                ">
                    <div>
                        {variant === 'LOGIN' ? 'New to Buzz?' : 'Already have an Account'}

                    </div>

                    <div 
                        onClick={toggleVariant} className="underline cursor-pointer">
                        {variant === 'LOGIN' ? 'Create an Account' : 'Login'}

                    </div>


                </div>

            </div>

        </div>
    );
}


export default AuthForm;