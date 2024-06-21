import {useState} from 'react';
import {BodyModal} from "./BodyModal.jsx";

export function Test() {

    const [testInput, setTestInput] = useState('');
    const [testObjectInput, setTestObjectInput] = useState({name: '', firstName: 'test'});

    return (
        <div className='p-3'>
            <div className='bg-gray-300 rounded-2xl mb-4 p-2'>
                <h1>Test Input Simple</h1>
                <input className={`bg-gray-400 rounded-2xl p-2`} type="text" value={testInput}
                       onChange={(e) => setTestInput(e.target.value)}/>

                <h2>Test Output Simple</h2>
                <p>{testInput}</p>

                <h1>Test Input Objet</h1>
                <input className={`bg-gray-400 rounded-2xl p-2`} type="text" value={testObjectInput.name}
                       onChange={(e) => setTestObjectInput({...testObjectInput, name: e.target.value})}/>

                <h2>Test Output Objet</h2>
                <p>{testObjectInput.name}</p>
            </div>
            <div className='bg-gray-300 rounded-2xl mb-4 p-2'>
                <h1>Test Slot</h1>
                <BodyModal>
                    <div>
                        <input className={`bg-gray-400 rounded-2xl p-2`} type="text"
                               value={testObjectInput.firstName}
                               onChange={(e) => setTestObjectInput({
                                   ...testObjectInput,
                                   firstName: e.target.value
                               })}/>
                        <div className={`p-2`}>{testObjectInput.firstName}</div>
                    </div>
                </BodyModal>

            </div>
        </div>
    )
}
