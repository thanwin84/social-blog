import {useState, useEffect} from 'react'

const useProgressBar = ()=>{
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [progress, setProgress] = useState(0)

    const startProgress = ()=>{
        setIsSubmitting(true)
    }
    const finishProgress = ()=>{
        setIsSubmitting(false)
        setProgress(0)
    }

    useEffect(()=>{
        let interval;
        if (isSubmitting){
            interval = setInterval(()=>{
                setProgress(prev => prev > 100 ? clearInterval(interval): prev + 10)
            }, 100)
        }

        return ()=> clearInterval(interval)
    }, [isSubmitting])
    return {
        isSubmitting,
        progress,
        startProgress,
        finishProgress
    }
}
export default useProgressBar