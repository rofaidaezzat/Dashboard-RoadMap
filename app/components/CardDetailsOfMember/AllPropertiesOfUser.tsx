import React from 'react'



interface IUser{
    completedlesson: string[];
    email: string;
    first_name: string;
    last_name: string;
    lesson: string[];
    roadmap: string[];
    task: string[];
    stage: string[];
    role:string
}

const AllPropertiesOfUser = (data: IUser) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Completed Lessons */}
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-xl">
                        <div className='flex items-center gap-2 mb-3'>
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className='text-lg font-semibold text-gray-800'>Completed Lessons</h3>
                        </div>
                        {data.completedlesson && data.completedlesson.length > 0 ? (
                            <div className="space-y-2">
                                {data.completedlesson.map((lesson, idx) => (
                                    <p className='text-sm text-gray-600 bg-white/50 p-2 rounded-lg' key={idx}>
                                        {idx + 1}. {lesson}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 italic">No completed lessons yet</p>
                        )}
                    </div>

                    {/* Current Lessons */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl">
                        <div className='flex items-center gap-2 mb-3'>
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className='text-lg font-semibold text-gray-800'>Current Lessons</h3>
                        </div>
                        {data.lesson && data.lesson.length > 0 ? (
                            <div className="space-y-2">
                                {data.lesson.map((lesson, idx) => (
                                    <p className='text-sm text-gray-600 bg-white/50 p-2 rounded-lg' key={idx}>
                                        {idx + 1}. {lesson}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 italic">No current lessons</p>
                        )}
                    </div>

                    {/* Roadmaps */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                        <div className='flex items-center gap-2 mb-3'>
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                            </div>
                            <h3 className='text-lg font-semibold text-gray-800'>Roadmaps</h3>
                        </div>
                        {data.roadmap && data.roadmap.length > 0 ? (
                            <div className="space-y-2">
                                {data.roadmap.map((roadmap, idx) => (
                                    <p className='text-sm text-gray-600 bg-white/50 p-2 rounded-lg' key={idx}>
                                        {idx + 1}. {roadmap}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 italic">No roadmaps yet</p>
                        )}
                    </div>

                    {/* Stages */}
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl">
                        <div className='flex items-center gap-2 mb-3'>
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className='text-lg font-semibold text-gray-800'>Stages</h3>
                        </div>
                        {data.stage && data.stage.length > 0 ? (
                            <>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {data.stage.map((stage, idx) => (
                                    <span
                                        key={idx}
                                        className="inline-block px-4 py-2 rounded-full bg-orange-400 text-white font-semibold text-sm shadow-md border border-orange-500 animate-pulse"
                                    >
                                        {idx + 1}. {stage}
                                    </span>
                                ))}
                            </div>
                            {/* Progress Bar for Stages */}
                            <div className="w-full bg-orange-100 rounded-full h-3 mb-2">
                                <div
                                    className="bg-orange-500 h-3 rounded-full transition-all duration-300"
                                    style={{ width: `${(data.stage.length / (data.stage.length || 1)) * 100}%` }}
                                ></div>
                            </div>
                            <div className="text-right text-xs text-orange-700 font-semibold">{data.stage.length} / {data.stage.length} Stages</div>
                            </>
                        ) : (
                            <p className="text-sm text-gray-500 italic">No stages yet</p>
                        )}
                    </div>

                    {/* Tasks */}
                    <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-xl md:col-span-2">
                        <div className='flex items-center gap-2 mb-3'>
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </div>
                            <h3 className='text-lg font-semibold text-gray-800'>Tasks</h3>
                        </div>
                        {data.task && data.task.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {data.task.map((task, idx) => (
                                    <p className='text-sm text-gray-600 bg-white/50 p-2 rounded-lg' key={idx}>
                                        {idx + 1}. {task}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 italic">No tasks yet</p>
                        )}
                    </div>
                </div>
    )
}

export default AllPropertiesOfUser