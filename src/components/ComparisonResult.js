import React from 'react'

export const ComparisonResult = ({ result }) => {
    return (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-8">
            <p
                className={`text-center px-4 py-2 rounded-lg shadow-lg text-xl ${
                    result.includes('wins')
                        ? 'bg-green-500 text-white'
                        : 'bg-slate-950 text-white'
                }`}
            >
                {result}
            </p>
        </div>
    )
}
