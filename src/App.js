import React, { useState, useEffect } from 'react'
import { initialList } from './constants/dummyData'
import { Button, ComparisonResult } from './components'
function App() {
    const [list, setList] = useState(() => {
        const storedList = localStorage.getItem('scoreList')
        return storedList ? JSON.parse(storedList) : initialList
    })

    const [showModal, setShowModal] = useState(false)
    const [selectedItem1, setSelectedItem1] = useState(null)
    const [selectedItem2, setSelectedItem2] = useState(null)
    const [comparisonResult, setComparisonResult] = useState('')
    const [chosenItems, setChosenItems] = useState([])

    const [first] = chosenItems
    const lastItem = chosenItems[chosenItems.length - 1]

    const chooseRandomItems = () => {
        const chosenItemsCopy = []

        while (chosenItemsCopy.length < 2) {
            const randomIndex = Math.floor(Math.random() * list.length)
            const randomItem = list[randomIndex]

            if (!chosenItemsCopy.includes(randomItem)) {
                chosenItemsCopy.push(randomItem)
            }
        }

        setChosenItems(chosenItemsCopy)
        setShowModal(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (selectedItem1 === selectedItem2) {
            setShowModal(false)
            setSelectedItem1(null)
            setSelectedItem2(null)
            setComparisonResult('Draw!')
            return
        }

        const updatedList = list.map((item) => {
            if (
                item.Name ===
                (selectedItem1 > selectedItem2 ? first.Name : lastItem.Name)
            ) {
                return { ...item, Score: item.Score + 1 }
            }
            return item
        })

        const winner =
            selectedItem1 > selectedItem2 ? first.Name : lastItem.Name
        setComparisonResult(`${winner} wins!`)
        setList(updatedList)
        setShowModal(false)
        setSelectedItem1(null)
        setSelectedItem2(null)
    }

    useEffect(() => {
        localStorage.setItem('scoreList', JSON.stringify(list))
    }, [list])

    useEffect(() => {
        if (comparisonResult) {
            const timer = setTimeout(() => {
                setComparisonResult('')
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [comparisonResult])

    // Sort the list by score in descending order
    const sortedList = [...list].sort((a, b) => b.Score - a.Score)

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">List with Scores</h1>

            <table className="table-auto border-collapse border w-full">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border">Position</th>
                        <th className="px-6 py-3 border">Name</th>
                        <th className="px-6 py-3 border">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedList.map((item, index) => {
                        const { Name, Score } = item
                        return (
                            <tr key={index + 1}>
                                <td className="border px-6 py-3">
                                    {index + 1}
                                </td>
                                <td className="border px-6 py-3">{Name}</td>
                                <td className="border px-6 py-3">{Score}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div className="mt-4">
                <Button onClick={chooseRandomItems} text="Start" />
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <form
                            onSubmit={handleSubmit}
                            className="flex items-center justify-center space-x-4"
                        >
                            <div>
                                <label htmlFor="item1" className="mr-2">
                                    {first.Name}:
                                </label>
                                <input
                                    type="number"
                                    id="item1"
                                    value={selectedItem1 || ''}
                                    onChange={(e) =>
                                        setSelectedItem1(
                                            parseInt(e.target.value)
                                        )
                                    }
                                    className="border border-gray-300 px-2 py-1 w-20"
                                />
                            </div>
                            <div>
                                <input
                                    type="number"
                                    id="item2"
                                    value={selectedItem2 || ''}
                                    onChange={(e) =>
                                        setSelectedItem2(
                                            parseInt(e.target.value)
                                        )
                                    }
                                    className="border border-gray-300 px-2 py-1 w-20"
                                />
                                <label htmlFor="item2" className="ml-2">
                                    :{lastItem.Name}
                                </label>
                            </div>
                            <Button onClick={handleSubmit} text="Submit" />
                        </form>
                    </div>
                </div>
            )}

            {comparisonResult && <ComparisonResult result={comparisonResult} />}
        </div>
    )
}

export default App
