import { useState } from 'react';
import { useRef } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCloudUpload } from 'react-icons/bs';
import FileDisplay from './FileDisplay';

function ProductModifySection({state, dispatch, header, data}) {
    const uploadedFiles = useRef(null);
    const pro = useRef(null);

    const specificationName = useRef(null);
    const specificationValue = useRef(null);

    const [imageFiles, setImageFiles] = useState([]);
    const [test,setTest] = useState(false);
    const removePro = (key) =>{
        let currentPros = state.pros;
        currentPros = currentPros.filter(p=> p.id !== Number(key));
        console.log(currentPros);
        dispatch({type:"pros",payload:currentPros});
    }
    const removeSpecification = (key) =>{
        let currentSpecifications = state.specifications;
        currentSpecifications = currentSpecifications.filter(p=>p.id !== Number(key));
        dispatch({type:"specifications", payload:currentSpecifications});
    }
    const handleAddPro = (e) => {
        console.log(e);
        e.preventDefault();
        // setPros([...pros, {val:pro.current.value, id:e.timeStamp}]);
        dispatch({type:"pros",payload:[...state.pros, {val:pro.current.value, id:e.timeStamp}]});
        pro.current.value = "";
        console.log(state);
    }
    const handleAddSpecification = (e) => {
        e.preventDefault();
        dispatch({type:"specifications",payload:[...state.specifications, {name:specificationValue.current.value, val:specificationName.current.value, id:e.timeStamp}]});
        specificationName.current.value = "";
        specificationValue.current.value = "";
    }
    const handleFileSubmit = (fileInput) =>{
        const files = fileInput.files;
        const data = (imageFiles.length > 0 ? imageFiles : []);
        for(let i =0; i < files.length; i++){
            let reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.addEventListener("load", () => {
                data.push([files[i].name, files[i].size, reader.result]);
                setImageFiles(()=>data);
  }, {once:true});
        }
        setTimeout(() => {
            setTest(!test);
            dispatch({type:"images",payload:imageFiles});
        }, 100);
    }
  return (
    <div className="bg-white rounded p-8 ">
        <h2 className='bg-slate-200 text-neutral-800 p-4 text-lg mb-6'>{header}</h2>
        <div className="flex flex-col justify-center gap-4">
        {data.map(({name, type, items=[]})=>{
            if(type==="text"){
            return <div className="text-base">
                <p className='text-neutral-800 font-semibold mb-2 text-sm'>{name}</p>
                <input value={state.name} onChange={(e)=>dispatch({type:"name",payload:e.target.value})} type='text' className="border-2 rounded p-2"/>
            </div>
            }else if(type==="number"){
                    return <div className="text-base">
                <p className='text-neutral-800 font-semibold mb-2 text-sm'>{name}</p>
                <input value={state.price} onChange={(e)=>dispatch({type:"price",payload:e.target.value})} type='number' className="border-2 rounded p-2"/>
            </div>
            }else if(type==="textarea"){
                return <div className='text-base'>
                <p className='text-neutral-800 font-semibold mb-2 text-sm'>{name}</p>
                <textarea value={state.description} onChange={(e)=>dispatch({type:"description",payload:e.target.value})} name="" id="" className="border-2 rounded w-3/4 p-2"></textarea>
                </div>
            }else if(type==="limitedNumber"){
                return <div className="text-base">
                 <p className='text-neutral-800 font-semibold mb-2 text-sm'>{name} (%)</p>
                <input value={state.discount} onChange={(e)=>dispatch({type:"discount",payload:e.target.value})} type="number" min={0} max={99} className="border-2 rounded p-2"/>
                </div>
            }else if(type==="radio"){
                return <div className="text-sm">
                    <p className='text-neutral-800 font-semibold mb-2'>{name}</p>
                    <div className="flex items-center gap-2">
                    <input onChange={(e)=>dispatch({type:"status",payload:"Instock"})} type="radio" name="status" value="Instock" id="status-instock"/>
                    <label htmlFor="status-instock">Instock</label>
                    <input onChange={(e)=>dispatch({type:"status",payload:"Unavailable"})} type="radio" name="status" value="Unavailable" id="status-unavailable"/>
                    <label htmlFor="status-unavailable">Unavailable</label>
                </div></div>
            }else if(type==="image"){
                return <div className="text-base">
                <label for="product-file" className='cursor-pointer flex flex-col justify-center items-center gap-2 border-2 border-dashed border-slate-300 py-10 hover:border-slate-500 transition'>
                    <BsCloudUpload className='text-slate-400 text-4xl'/>
                    <p className='text-2xl text-neutral-800'>Click Here to Add Files</p>   
                    </label>
                    <input className='hidden' type="file" accept="image/*" name="file" id="product-file" multiple onChange={(e)=>handleFileSubmit(e.currentTarget)}/>
                    <div className="uploadedFiles" ref={uploadedFiles}></div>
                    {imageFiles.map(image=>{
                      return <FileDisplay name={image[0]} size={image[1]} image={image[2]}/>
                    })}
                </div>
            }else if(type === "customAdd"){
                return <div>
                            <div className="flex gap-4 items-end">
                    <p className='text-base mb-2'>Name</p>
                    <input ref={pro} type="text" placeholder='e.g. High Quality' className='border-2 rounded p-4 text-sm'/>
                    <button onClick={(e)=>handleAddPro(e)} className='btn-primary w-20 py-2 rounded bg-blue-500 hover:bg-blue-600 transition text-neutral-100 font-semibold text-lg mb-2'>Add</button>
                    </div>
                <div className="flex flex-wrap mt-4 gap-2">
                {state.pros.map(({val, id})=>{
                    return <p data-id={id} key={id} className='rounded px-4 py-2 bg-blue-500 text-neutral-100 font-semibold text-base w-max flex justify-between gap-8 items-center'><span>{val}</span><span><AiOutlineDelete onClick={(e)=>removePro(e.currentTarget.parentElement.parentElement.getAttribute("data-id"))} className="text-neutral-100 font-extrabold text-xl hover:text-red-400 transition cursor-pointer"/></span></p>
                })}
                </div>
                </div>
            }else if(type==="dropdown"){
                return <div>
                    <div className="flex items-start gap-4 flex-col sm:flex-row sm:items-end">
                        <div className="">
                     <p className='text-base mb-2'>Name</p>
                    <input ref={specificationName} type="text" placeholder='e.g. Size' className='border-2 rounded p-4 text-sm'/>
                    </div>
                    <div className="">
                     <p className='text-base mb-2'>Values</p>
                    <input ref={specificationValue} type="text" placeholder='e.g. Small,Medium,Large' className='border-2 rounded p-4 text-sm'/>
                    </div>
                    <button onClick={(e)=>handleAddSpecification(e)} className='btn-primary w-20 py-2 rounded bg-blue-500 hover:bg-blue-600 transition text-neutral-100 font-semibold text-lg mb-2'>Add</button>
                </div>
                <div className="flex flex-wrap mt-4 gap-2">
                {state.specifications.map(({name, val, id})=>{
                    return <div className="rounded px-4 py-2 bg-blue-500 text-neutral-100 font-semibold text-base w-max flex justify-between items-center flex-col gap-2">
                        <p className='text-lg'>{val}</p>
                        <p data-id={id} key={id} className='flex gap-4 text-sm'><span>{name}</span><span><AiOutlineDelete onClick={(e)=>removeSpecification(e.currentTarget.parentElement.parentElement.getAttribute("data-id"))} className="text-neutral-100 font-extrabold text-xl hover:text-red-400 transition cursor-pointer"/></span></p></div>
                })}
                </div>
                </div>
            }else{
                return <div className=""></div>
            }
        })}
        </div>
    </div>
  )
}

export default ProductModifySection