import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/Title'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext'

const AddRoom = () => {
    const { axios, getToken } = useAppContext()

    const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null })
    const [loading, setLoading] = useState(false)

    const initialInputs = {
        roomType: '',
        pricePerNight: '',
        amenities: {
            'Free WiFi': false,
            'Free Breakfast': false,
            'Room Service': false,
            'Mountain View': false,
            'Pool Access': false
        }
    }

    const [inputs, setInputs] = useState(initialInputs)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        // Validation
        const hasImage = Object.values(images).some((img) => img !== null)
        if (!inputs.roomType || !inputs.pricePerNight || Number(inputs.pricePerNight) <= 0 || !hasImage) {
            toast.error("Please provide a room type, valid price, and at least one image.")
            return
        }

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('roomType', inputs.roomType)
            formData.append('pricePerNight', inputs.pricePerNight)

            // Filter enabled amenities and stringify for the backend
            const selectedAmenities = Object.keys(inputs.amenities).filter((key) => inputs.amenities[key])
            formData.append('amenities', JSON.stringify(selectedAmenities))

            // Append selected images
            Object.keys(images).forEach((key) => {
                if (images[key]) {
                    formData.append('images', images[key])
                }
            })

            const token = await getToken({ skipCache: true })
            if (!token) {
                throw new Error('Your session has expired. Please sign in again.')
            }
            const { data } = await axios.post('/api/rooms/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.success) {
                toast.success(data.message || "Room added successfully!")
                setInputs(initialInputs)
                setImages({ 1: null, 2: null, 3: null, 4: null })
            } else {
                toast.error(data.message || "Failed to add room.")
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Room could not be created.'
            toast.error(message)
            console.error('Add room failed:', error.response?.status, error.response?.data || error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className="p-2">
            <Title 
                align='left' 
                font='outfit' 
                title='Add Room' 
                subTitle='Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience.' 
            />

            {/* Upload Area For Images */}
            <p className='text-gray-800 mt-10 font-medium'>Images</p>
            <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
                {Object.keys(images).map((key) => (
                    <label key={key} htmlFor={`roomImage${key}`} className='cursor-pointer'>
                        <img 
                            className='h-24 w-28 object-cover rounded border border-dashed border-gray-300 opacity-90 hover:opacity-100 transition-opacity' 
                            src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} 
                            alt={`Room preview ${key}`} 
                        />
                        <input 
                            type="file" 
                            accept='image/*' 
                            id={`roomImage${key}`} 
                            hidden
                            onChange={(e) => {
                                const file = e.target.files[0]
                                if (file) {
                                    setImages((prev) => ({ ...prev, [key]: file }))
                                }
                            }} 
                        />
                    </label>
                ))}
            </div>

            <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>
                <div className='flex-1 max-w-48'>
                    <p className='text-gray-800 mt-4 font-medium'>Room Type</p>
                    <select 
                        className='border border-gray-300 mt-1 rounded p-2 w-full text-gray-700' 
                        value={inputs.roomType} 
                        onChange={(e) => setInputs((prev) => ({ ...prev, roomType: e.target.value }))}
                    >
                        <option value=''>Select Room Type</option>
                        <option value='Single Bed'>Single Bed</option>
                        <option value='Double Bed'>Double Bed</option>
                        <option value='Luxury Room'>Luxury Room</option>
                        <option value='Family Suite'>Family Suite</option>
                    </select>
                </div>

                <div>
                    <p className='mt-4 text-gray-800 font-medium'>Price <span className='text-xs font-normal text-gray-500'>/night</span></p>
                    <input 
                        type="number" 
                        placeholder='0' 
                        min="1"
                        className='border border-gray-300 mt-1 rounded p-2 w-28 text-gray-700' 
                        value={inputs.pricePerNight} 
                        onChange={(e) => setInputs((prev) => ({ ...prev, pricePerNight: e.target.value }))} 
                    />
                </div>
            </div>

            <p className='text-gray-800 mt-6 font-medium'>Amenities</p>
            <div className='flex flex-col gap-2 mt-2 text-gray-600 max-w-sm'>
                {Object.keys(inputs.amenities).map((amenity, index) => (
                    <label key={index} htmlFor={`amenity-${index}`} className='flex items-center gap-2 cursor-pointer'>
                        <input 
                            type='checkbox' 
                            id={`amenity-${index}`} 
                            checked={inputs.amenities[amenity]}
                            onChange={() => setInputs((prev) => ({
                                ...prev, 
                                amenities: { ...prev.amenities, [amenity]: !prev.amenities[amenity] } 
                            }))}
                        />
                        <span className='text-sm select-none'>{amenity}</span>
                    </label>
                ))}
            </div>

            <button 
                type='submit' 
                className={`bg-primary text-white px-8 py-2.5 rounded mt-8 transition-opacity ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:opacity-95"}`} 
                disabled={loading}
            >
                {loading ? "Adding Room..." : "Add Room"}
            </button>
        </form>
    )
}

export default AddRoom