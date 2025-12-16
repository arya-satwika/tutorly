'use client'
import Image from "next/image";
import { insertUser } from "@/lib/db/queries";
import { useActionState } from "react";
import { addCourse } from "@/lib/actions";

export default function createCourse(){
  const [ {succes, message, imageUrl}, handleSubmit, isPending ] = useActionState(addCourse,{
    succes: false,
    message: "",
    imageUrl: ""
  })

  return (
    <div className="flex-1 bg-gray-500 p-4">
      <h1 className="text-white text-5xl font-bold">SANDBOX!</h1>
      <form action={handleSubmit}>
          <input type="text" placeholder="nama" name="title" className="bg-red-700"/>
          <br />
          <input type="text" placeholder="teacher" name="teacher" className="bg-red-700"/>
          <br />
          <textarea name="description" placeholder="deskripsi" className="text-white bg-card-background" id="description"/>
          <br />
          <input type="text" placeholder="harga" name="harga" className="bg-red-700"/>
          <br />
          <input type="text" placeholder="tags" name="tags" className="bg-red-700"/>
          <input type="file" name="image" accept='.png,.jpg,.jpeg,.webp' className="bg-red-700"/>
          
          
          <button type="submit" disabled={isPending}>
            {isPending ? "Uploading..." : "Submit"}
          </button>
      </form>
      
      {/* Display upload result */}
      {message && (
        <div className={`mt-4 p-3 rounded-lg ${succes ? 'bg-green-600' : 'bg-red-600'}`}>
          <p className="text-white">{message}</p>
        </div>
      )}
      
      {imageUrl && (
        <div className="mt-4 p-4 bg-gray-700 rounded-lg">
          <p className="text-white mb-2">Uploaded Image URL:</p>
          <a 
            href={imageUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 break-all"
          >
            {imageUrl}
          </a>
          <div className="mt-4">
            <Image 
              src={imageUrl} 
              alt="Uploaded image" 
              width={300} 
              height={200} 
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
