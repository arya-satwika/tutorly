import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

type CourseCardProps = {
    id: number,
    title: string,
    description: string,
    tags: string[],
    imageUrl: string,
    teacherName: string,
    teacherAvatar?: string,
    harga: number,
    studentCount?: number,
    startAt: Date,
    endAt: Date,
    rating?: number,
    className?: string
}


export function CourseTags({courseTag}: {courseTag: string}){
    return(
        <div className='bg-tag-background px-3 py-[0.3px] text-sm border-tag-border border rounded-full w-fit h-fit text-foreground-blue'>
            {courseTag}
        </div>
    )
}

let placeholderDesc = "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

export default function CourseCard({
    id,
    title, 
    description, 
    tags=[], 
    imageUrl,
    teacherName,
    harga,
    studentCount,
    startAt,
    endAt,
    rating = 5.0,
    className
}: CourseCardProps){
    
    
    // =======INI PLACEHOLDER NANTI DIHAPUS===========
    // imageUrl = 'https://4zj2fsf4qc.ucarecd.net/8f504100-3626-4622-807b-f6acbe3e0a4f/'
    
    
    
    const sizedUrl = `${imageUrl}-/scale_crop/300x200/center/`
    const dateStart = new Date(startAt);
    const dateEnd = new Date(endAt);
    return(
        <Link href={`/courses/${id}`} className={`bg-white rounded-2xl border-2 border-blue-100 overflow-hidden shadow-md w-90 ${className}`}>
            <div className="relative h-[200px] w-full">
                {imageUrl && (
                    <Image 
                        src={sizedUrl}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                )}
            </div>
            
            {/* Course Content */}
            <div className="p-4">
                {/* Title */}
                <h2 className="font-bold text-lg text-gray-800 leading-tight mb-1">
                    {title}
                </h2>
                
                {/* Description */}
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {description}
                </p>
                
                {/* Stats Row */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                        <span>{studentCount} Student</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{format(startAt, 'MM/dd/yy, h:mm')} - {format(endAt, 'MM/dd/yy, h:mm')}</span>
                    </div>
                </div>
                
                {/* Teacher and Rating Row */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* Teacher Avatar */}
                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </div>
                        <span className="text-sm text-gray-600">{teacherName}</span>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}