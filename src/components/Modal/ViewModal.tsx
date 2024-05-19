import moment from 'moment';
import { useEffect } from 'react';

const ViewModal = ({ isOpen, title, data, onCancel, type }) => {
  // Apply a class to the root element conditionally based on the modal's visibility
  const modalContainerClass = isOpen ? '' : 'hidden';

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      onCancel(); // Close the modal
    }
  };

  // Effect to add event listener for escape key press
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  // Function to handle click outside the modal
  const handleClickOutside = (e) => {
    if (!e.target.closest('.modal-content')) {
      onCancel(); // Close the modal
    }
  };

  return (
    <div
      className={`fixed z-999 inset-0 overflow-y-auto ${modalContainerClass}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={handleClickOutside}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="absolute inset-0 bg-black opacity-60 backdrop-filter backdrop-blur-sm"></div>{' '}
        {/* Background blur effect */}
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full relative z-10 modal-content">
          <div className="p-4">
            <div className="text-lg font-semibold mb-8" id="modal-title">
              {title}
            </div>
            {type === 'booking' && <RenderBooking data={data} />}
            {type === 'contact' && <RenderContact data={data} />}
            {type === 'car' && <RenderCar data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
const RenderCar = ({ data }) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-1">
          <span className="font-semibold">Title</span>: {data?.title}
        </div>
        <div className="mb-1">
          <span className="font-semibold">Brand</span>: {data?.brand}
        </div>
        <div className="mb-1">
          <span className="font-semibold">Model</span>: {data?.model}
        </div>
        <div className="mb-1">
          <span className="font-semibold">Color</span>: {data?.color}
        </div>
        <div className="mb-1">
          <span className="font-semibold">Condition</span>: {data?.condition}
        </div>
        <div className="mb-1">
          <span className="font-semibold">Condition</span>: {data?.condition}
        </div>
        <div className="mb-1">
          <span className="font-semibold">Price</span>: {data?.price}
        </div>
        <div className="mb-1">
          <span className="font-semibold">Phone</span>: {data?.phone}
        </div>
        <div className="mb-1">
          <span className="font-semibold">Production Year</span>:{' '}
          {data?.production_year}
        </div>
        <div className="mb-1">
          <span className="font-semibold">Registration Year</span>:{' '}
          {data?.registration_year}
        </div>
        <div className="mb-1">
          <span className="font-semibold">Transmition</span>:{' '}
          {data?.transmition}
        </div>

        <div className="mb-1">
          <span className="font-semibold">Datails</span>: details
        </div>
        <div className="mb-1">
          <span className="font-semibold">District</span>: {data?.district}
        </div>
        <div className="mb-1">
          <span className="font-semibold">Division</span>: {data?.division}
        </div>
        <div className="mb-1">
          <span className="font-semibold">Upazila</span>: {data?.upazila}
        </div>
        <div className="mb-1">
          <span className="font-semibold">Engine Capacity</span>:{' '}
          {data?.engine_capacity} CC
        </div>
        <div className="mb-1">
          <span className="font-semibold">Kilometer</span>: {data?.kilometer}
        </div>
        <div className="mb-1">
          <span className="font-semibold">Status</span>: {data?.status}
        </div>

        <div className="mb-1">
          <span className="font-semibold">Status</span>:{' '}
          {data?.fuelType.map((item, index) => (
            <span className="text-md mx-1" key={index}>
              {item.label}
            </span>
          ))}
        </div>
        <div className="mb-1">
          <span className="font-semibold">Date Posted</span>: {data?.createdAt}
        </div>
        <div className="mb-1">
        <span className="font-semibold">Gallery</span>
          <span className="flex">
          {data?.gallery?.map((item, index) => (
            <img
              key={index}
              src={`https://res.cloudinary.com/dneodtbad/image/upload/${item}`}
              className="h-16 max-w-full cursor-pointer rounded-lg object-cover object-center mr-1"
              alt="gallery-image"
            />
          ))}
          </span>
        </div>
      </div>
    </div>
  );
};

const RenderContact = ({ data }) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-2">
          <span className="font-semibold">Requested Date</span>:{' '}
          {moment(data?.createdAt).format('MMM Do YY')}
        </div>

        <div className="mb-2">
          <span className="font-semibold">Name</span>: {data?.name}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Phone</span>: {data?.phone}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Email</span>: {data?.email}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Message</span>: {data?.message}
        </div>
      </div>
    </div>
  );
};

const RenderBooking = ({ data }) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-2">
          <span className="font-semibold">Booking Date</span>:{' '}
          {moment(data?.bookingDate).format('MMM Do YY')}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Address</span>: {data?.address}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Customer Name</span>: {data?.name}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Customer Phone</span>: {data?.phone}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Car</span>: {data?.car}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Message</span>: {data?.message}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Status</span>:
          <span
            className={`${
              data?.status === 'pending'
                ? 'bg-red-500'
                : data?.status === 'approved'
                ? 'bg-blue-500'
                : 'bg-warning'
            } text-white p-2 ml-2`}
          >
            {/* {data?.status?.toUpperCase()} */}
          </span>
        </div>

        <div className="mb-2">
          <span className="font-semibold">Booked By</span>: {data?.userid?.name}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Booked Email</span>:{' '}
          {data?.userid?.email}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Date When Booked</span>:{' '}
          {moment(data?.userid?.createdAt).format('MMM Do YY')}
        </div>
      </div>
    </div>
  );
};
