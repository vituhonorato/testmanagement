import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '@/components/Layout';
import { getError } from '@/utils/error';
import { BiArrowBack } from "react-icons/bi";


type FormValues = {
    name:string;
    slug:string;
    category:string; 
    image:File; 
    date:string;
    description: string;
    contact:string;
   };

function reducer(state:any, action:any){
    switch(action.type){
        case 'FETCH_REQUEST':
            return {...state, loading: true , error:''};
            case 'FETCH_SUCCESS':
           return {...state, loading: false, error:''};
           case 'FETCH_FAIL':
            return {...state, loading:false, error:action.payload};
            case 'UPLOAD_REQUEST':
                return {...state, loadingUpload: true, errorUpload:''};
            case 'UPLOAD_SUCCESS':
                return {...state, loadingUpload:false, errorUpload:''};
            case 'UPLOAD_FAIL':
                return {...state, loadingUpload:false, errorUpload:action.payload};        
            default: 
            return state;
    }
}

const AdminCertificalEditScreen = () => {
    const router = useRouter()
    const {query} = useRouter();
    const certificalId:any = query.id;
    const [{loading, error, loadingUpdate, loadingUpload}, dispatch] = useReducer(reducer, {
        loading:true,
        error:''
    });

    const {register,handleSubmit, formState: {errors}, setValue} = useForm<FormValues>();

    useEffect(()=>{
        const fetchData = async () => {
            try {
                dispatch({type:'FETCH_RESQUEST'})
                const {data} = await axios.get(`/api/admin/certificals/${certificalId}`);
                dispatch({type:'FETCH_SUCCESS'})
                setValue('name', data.name);
                setValue('slug', data.slug);
                setValue('category', data.category);
                setValue('image', data.image);
                setValue('date', data.date);
                setValue('description', data.description);
                setValue('contact', data.contact);
                
                
                
            }catch (err){
                dispatch({type: 'FETCH_FAIL'})
            }
        }
        fetchData();
    },[certificalId, setValue])


     const uploadHandler = async (e:any, imageField:any = 'image') => {
        const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
        try{
            dispatch({type:'UPLOAD_REQUEST'});
            const { data:{ signature, timestamp }  } = await axios('/api/admin/cloudinary-sign');

            const file = e.target.files[0];
            const formData:any = new FormData();
            formData.append('file', file);
            formData.append('signature', signature);
            formData.append('timestamp', timestamp);
            formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
            const { data } = await axios.post(url, formData);

            dispatch({ type: 'UPLOAD_SUCCESS'});
            setValue(imageField, data.secure_url);
            toast.success('File upload successfully');

        }catch(err){
            dispatch({type:'UPLOAD_FAIL', payload: getError(err)});
            toast.error(getError(err));
        }
     }

    const submitHandler = async ({name, category, slug, image, date, description,  contact }:any) => {
       try{
        dispatch({type:'UPDATE_REQUEST'});
        await axios.put(`/api/admin/certificals/${certificalId}`, {
            name, slug,  category, image,date, description, contact   
        });
        dispatch({type:'UPDATE_SUCCESS'});
        toast.success('Produto atualizado com sucesso!')
        router.push('/admin/certificals');
       }catch(err){
        dispatch({type:'UPDATE_FAIL', payload: getError(err)});
       }
    };
    
    return (
        <Layout title={`Certifical: ${certificalId}`}>
            
            <div className='grid md:grid-cols-4 md:gap-5'>
            <div className='text-indigo600'>
                <ul>
                    <li>
                        <Link className='text-indigo' href="/admin/dashboard">
                            <p >Painel Principal</p>
                        </Link>
                    </li>
                    <li>
                        <Link className='text-indigo' href='/admin/news'>Noticias</Link>
                    </li>
                    <li>
                        <Link className='text-indigo' href='/admin/services'>Serviços</Link>
                    </li>
                    {/* <li>
                        <Link className='text-indigo' href='/admin/vacancies'>Vagas</Link>
                    </li> */}
                    <li>
                        <Link className='text-indigo' href='/admin/products'>
                        <p className='font-bold text-xl'>Vendas</p></Link>
                    </li>
                    <li>
                        <Link className='text-indigo' href='/admin/users'>Usuários</Link>
                    </li>
                    
                </ul>
            </div>
                <div className='md:col-span-3'>
                {loading ? (
                 <div>Loading...</div>
                 ): error ? (
                 <div className='alert-error'>{error}</div>
                 ):(
                    <form className='mx-auto max-screen-md' onSubmit={handleSubmit(submitHandler)}>
                            <h1 className='mb-4 text-3xl font-semibold pt-8'>{` Certifical ${certificalId}`}</h1>
                            <div className='bg-white rounded-md bg-opacity-80 m-2 p-2'>
                            <div className='mb-4'>
                                <label className='font-semibold' htmlFor='name' >Nome <span className='text-graym '>(Insira o nome da certificação)</span></label>
                                <input 
                                type='text' 
                                className='w-full' 
                                id='name' 
                                autoFocus 
                                {...register('name',{required: 'Insira o nome do produto'})}
                                />
                               {errors.name && (<div className='text-red'>{errors.name.message}</div>)}
                            </div>
                            <div className='mb-4'>
                                <label className='font-semibold' htmlFor='price' >Slug <span className='text-graym '>(Insira o slug da certificação sem letras maiúsculas, sem acentos, sem caracteres especiais EX: @;!;$;% , use - pra espaço EX: guarda-roupas-casal   )</span></label>
                                <input 
                                type='text' 
                                className='w-full' 
                                id='slug' 
                                
                                {...register('slug',{required: 'Insira o slug do produto'})}
                                />
                               {errors.slug && (<div className='text-red'>{errors.slug.message}</div>)}
                            </div>

                            <div className='mb-4'>
                                <label className='font-semibold' htmlFor='category' >Categoria <span className='text-graym '>(Insira a categoria do produto)</span></label>
                                <input 
                                type='text' 
                                className='w-full' 
                                id='category' 
                                
                                {...register('category',{required: 'Insira a categoria do produto'})}
                                />
                               {errors.category && (<div className='text-red'>{errors.category.message}</div>)}
                            </div>

                            <div className='mb-4'>
                                <label className='font-semibold' htmlFor='image' >Imagem <span className='text-graym '>(Não digite nada nesse campo, ele será preenchido ao escolher o arquivo no seu dispositívo)</span></label>
                                <input 
                                type='text' 
                                className='w-full' 
                                id='image' 
                                
                                {...register('image',{required: 'Insira a imagem do produto'})}
                                />
                               {errors.image && (<div className='text-red'>{errors.image.message}</div>)}
                            </div>
                            <div className='mb-4'>
                                <label className='font-semibold' htmlFor='imageFile'>Upload image <span className='text-graym '>(Escolha a imagem no seu dispositivo )</span></label>
                                <input type='file' className='w-full' id='imageFile' onChange={uploadHandler}/>
                                {loadingUpload && <div></div>}
                            </div>

                         
                            
                          
                        
                            <div className='mb-4'>
                                <label className='font-semibold' htmlFor='image' >Descrição <span className='text-graym '>(Insira a descrição do produto com o nome da pessoa que está vendendo no final caso desejar!)</span></label>
                                <input 
                                type='text' 
                                className='w-full' 
                                id='description' 
                                
                                {...register('description',{required: 'Insira a descrição do produto'})}
                                />
                               {errors.description && (<div className='text-red'>{errors.description.message}</div>)}
                            </div>
                            <div className='mb-4'>
                                <label className='font-semibold' htmlFor='image' >Contato <span className='text-graym '>(Insira o contato da pessoa sem espaços, sem parentese, sem hífen, no fomato EX: 5571998765432)</span></label>
                                <input 
                                type='text' 
                                className='w-full' 
                                id='contact' 
                                
                                {...register('contact',{required: 'Insira o contato do produto'})}
                                />
                               {errors.contact && (<div className='text-red'>{errors.contact.message}</div>)}
                            </div>
                               <div className='mb-4'>
                                <label className='font-semibold' htmlFor='image' >Data <span className='text-graym '>(Insira a data de emissão no formato: 00/00/0000)</span></label>
                                <input 
                                type='text' 
                                className='w-full' 
                                id='date' 
                                
                                {...register('date',{required: 'Insira a data de emissão'})}
                                />
                               {errors.contact && (<div className='text-red'>{errors.contact.message}</div>)}
                            </div>
                            <div className='mb-4'>
                                <button disabled={loadingUpdate} className='primary-button'>
                                    {loadingUpdate ? 'Loading' : 'Update'}
                                </button>

                            </div>
                            <Link className="text-indigo600 font-semibold flex py-2" href="/admin/certificals">
        <span className='py-1 px-1 '><BiArrowBack/></span>
        Voltar
      </Link>
                         </div>
                    </form>
                 )}
                </div>
              </div>
            
        </Layout>
    )
}
AdminCertificalEditScreen.auth = {adminOnly: true};
export default AdminCertificalEditScreen