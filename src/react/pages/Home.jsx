import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'

export default function Home() {
    const [compName, setCompName] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const compExists = (comp) => {
        const comps = []
        for (let i = 0; i < localStorage.length; i++) {
            comps.push(localStorage.key(i))
        }
        if (comps.includes(comp)) {
            return true
        } else {
            return false
        }
    }

    const checkComp = (comp) => {
        if (compExists(comp)) {
            setError(true)
        } else {
            setError(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        checkComp(compName)
        if (compName && !compExists(compName)) {
            localStorage.setItem(compName, JSON.stringify([]))
            navigate(`/competitions/${compName}`)
        }
    }

    useEffect(() => {
        if (compName == '') setError(false)
    }, [compName])

    return (
        <>
            <form className='card card-body mx-auto' style={{ maxWidth: 400, marginTop: '22%' }} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Competition:</label>
                    <input
                        type="text"
                        className={`form-control ${error ? 'is-invalid' : ''}`}
                        id="competition-name"
                        aria-describedby="emailHelp"
                        placeholder='Competition...'
                        onChange={e => setCompName(e.target.value)}
                    />
                    <div className="invalid-feedback">
                        <span>Competition already exists</span>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
                {localStorage.length > 0 && (
                    <div className='mt-4'>
                        <div style={{ marginInline: 'auto', width: 'fit' }}>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Select existing
                                </button>
                                <ul className="dropdown-menu">
                                    {[...Array(localStorage.length)].map((x, i) => {
                                        const path = localStorage.key(i)
                                        return (
                                            <li>
                                                <Link className="dropdown-item" to={`/competitions/${path}`}>
                                                    {localStorage.key(i)}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </>
    )
}
