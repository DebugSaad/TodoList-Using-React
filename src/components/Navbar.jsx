import React from 'react'

function Navbar() {
    return (
        <nav className='flex justify-between bg-sky-500 text-white py-2 '>
            <div className="logo">
                <span className=' font-bold text-xl mx-4 cursor-pointer'>
                    iTask
                </span>
            </div>
            <ul className="flex gap-5 mx-4">
                <li className='cursor-pointer w-[88px] hover:underline'>Home</li>
                <li className='cursor-pointer w-[88px] hover:underline'>Your Tasks</li>
            </ul>
        </nav>
    )
}

export default Navbar
