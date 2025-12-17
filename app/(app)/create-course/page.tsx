'use client'
import Image from "next/image";
import { insertUser } from "@/lib/db/queries";
import { useActionState } from "react";
import { addCourse } from "@/lib/actions";
import { useState } from "react";

export default function createCourse(){
  const [ {succes, message, imageUrl}, handleSubmit, isPending ] = useActionState(addCourse,{
    succes: false,
    message: "",
    imageUrl: ""
  })

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 bg-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Main Card */}
        <div className="bg-white border border-cyan-400 rounded-2xl p-6">
          <h1 className="text-xl font-bold text-gray-800 mb-6">Add Your Course</h1>
          
          <form action={handleSubmit} className="space-y-4">
            {/* Image Upload Area */}
            <div className="w-full">
              <label 
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-32 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {previewImage ? (
                  <Image 
                    src={previewImage} 
                    alt="Preview" 
                    width={120} 
                    height={80} 
                    className="rounded-lg object-cover h-24"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <span>Add Your Picture Course</span>
                  </div>
                )}
                <input 
                  id="image-upload"
                  type="file" 
                  name="image" 
                  accept='.png,.jpg,.jpeg,.webp' 
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* Course Name */}
            <div className="w-full md:w-1/2">
              <input 
                type="text" 
                placeholder="Course Name" 
                name="title" 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div className="w-full md:w-1/2">
              <input 
                type="text"
                name="description" 
                placeholder="Description" 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>

            {/* Tags (was Category in image) */}
            <div className="w-full md:w-1/2">
              <input 
                type="text" 
                placeholder="Tags" 
                name="tags" 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>

            {/* Harga (Price) */}
            <div className="w-full md:w-1/2">
              <input 
                type="text" 
                placeholder="Harga" 
                name="harga" 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>

            {/* Start Date */}
            <div className="w-full md:w-1/2">
              <label className="text-sm text-gray-500 mb-1 block">Start Date</label>
              <input 
                type="datetime-local" 
                name="startAt" 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>

            {/* End Date */}
            <div className="w-full md:w-1/2">
              <label className="text-sm text-gray-500 mb-1 block">End Date</label>
              <input 
                type="datetime-local" 
                name="endAt" 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button 
                type="submit" 
                disabled={isPending}
                className="bg-cyan-400 hover:bg-cyan-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                {isPending ? "Uploading..." : "Add Course"}
              </button>
            </div>
          </form>
        </div>
      
        {/* Display upload result */}
        {message && (
          <div className={`mt-4 p-3 rounded-lg ${succes ? 'bg-green-600' : 'bg-red-600'}`}>
            <p className="text-white">{message}</p>
          </div>
        )}
        
        {imageUrl && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-700 mb-2">Uploaded Image URL:</p>
            <a 
              href={imageUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-500 hover:text-cyan-600 break-all"
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
    </div>
  );
}
