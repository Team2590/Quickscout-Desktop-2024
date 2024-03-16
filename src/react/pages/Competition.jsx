// @ts-nocheck
import { useLocalStorage } from '@mantine/hooks'
import { download, generateCsv, mkConfig } from 'export-to-csv'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Competition() {
    const { competition } = useParams()
    const [data, setData] = useLocalStorage({ key: competition, defaultValue: [] })
    const [scanData, setScanData] = useState()
    const formRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        formRef.current.reset()
        const parsedScan = JSON.parse(scanData)
        parsedScan.map(value => {
            if (value === 'true') {
                return true;
            } else if (value === 'false') {
                return false;
            } else if (!isNaN(value)) {
                return parseFloat(value);
            }
        })
        const actualData = {
            id: JSON.parse(localStorage.getItem(competition)).length ? JSON.parse(localStorage.getItem(competition)).length + 1 : 1,
            matchNum: parsedScan[0],
            teamNum: parsedScan[1],
            scoutName: parsedScan[23],
            startingPos: parsedScan[2],
            leaveWing: parsedScan[3],
            spkrMade_atn: parsedScan[4],
            spkrMissed_atn: parsedScan[5],
            ampMade_atn: parsedScan[6],
            ampMissed_atn: parsedScan[7],
            spkrMade_tp: parsedScan[8],
            spkrMissed_tp: parsedScan[9],
            ampMade_tp: parsedScan[10],
            ampMissed_tp: parsedScan[11],
            coopertition: parsedScan[12],
            climbLvl: parsedScan[13],
            trap: parsedScan[14],
            traverseChain: parsedScan[17],
            twoRobots: parsedScan[18],
            droppedWhenHit: parsedScan[21]
        }
        setData(prevData => {
            if (prevData) {
                return [...prevData, actualData]
            } else {
                return [actualData]
            }
        })
    }

    const downloadCSV = () => {
        const csvConfig = mkConfig({
            fieldSeparator: ',',
            decimalSeparator: '.',
            useKeysAsHeaders: true,
            useBom: false
        })
        const csv = generateCsv(csvConfig)(data)
        download(csvConfig)(csv)
    }

    return (
        <>
            <Link to='/' className='m-1'>Home</Link>
            <h1 className='text-center mb-3'>{competition}</h1>
            <div className="card card-body mx-auto" style={{ maxWidth: 600 }}>
                <form onSubmit={handleSubmit} ref={formRef}>
                    <label htmlFor="exampleInputEmail1" className="form-label">Scan:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="competition-name"
                        aria-describedby="emailHelp"
                        onChange={e => setScanData(e.target.value)}
                    />
                    <button className='btn btn-primary mt-3 w-100' type='submit'>Enter</button>
                </form>
                <div className='mt-3'>
                    <button className='btn btn-secondary' onClick={downloadCSV}>Download</button>
                </div>
            </div>
            {data && data.map(d => {
                return (
                    <div className='card card-body mx-auto my-4' style={{ maxWidth: 600 }}>
                        <p>Team: {d.teamNum} | Name: {d.scoutName} | Match: {d.matchNum} </p>
                        <pre>{JSON.stringify(d)}</pre>
                    </div>
                )
            })}
        </>
    )
}
