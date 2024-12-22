import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast, { Toaster } from 'react-hot-toast';

function SecondHom() {
    const [input, setInput] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!input) {
                setCopied(false);
            }
        }, 2000);
        return () => clearInterval(intervalId);
    }, [input])

    function handleCopy() {
        if (!input) return toast.error('Please full out this field!!', { icon: '😈' })
        toast.success('Product copied!')
        setInput('')
    }

    return (
        <>
            <Toaster />
            <div className='flex flex-col justify-center items-center gap-[10px] mt-40 select-none'>
                <h1 className='mb-4 text-[30px] text-blue-500'>Copy/Paste Shopping List</h1>
                <input className='border-[2px] px-2 py-1 rounded-md w-full max-w-[350px] text-[18px]' value={input} onChange={(e) => setInput(e.target.value.trim())} type="text" placeholder="Enter your product.." />
                <CopyToClipboard text={input} onCopy={() => { input ? setCopied(true) : setCopied(false) }}>
                    <button className='bg-blue-500 mt-[10px] mb-[-7px] px-4 py-2 rounded-lg text-white' onClick={handleCopy}>Copy</button>
                </CopyToClipboard>
                {copied ? <span className="text-green-500">Copied</span> : null}
            </div>
        </>
    );
}

export default SecondHom;
