import { Link } from 'react-router-dom';

export const DriverDetails = ({ driver }) => {
  console.log(driver);
  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9">
        {/* <!-- Input Fields --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Personal Information
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <p className="mb-3 block text-black dark:text-white">
                <b>Drivers Name</b> : {driver?.name}
              </p>
            </div>

            <div>
              <p className="mb-3 block text-black dark:text-white">
                <b>Drivers Phone</b> : {driver?.phone}
              </p>
            </div>
            <div>
              <p className="mb-3 block text-black dark:text-white">
                <b>Drivers Division</b> : {driver?.division}
              </p>
            </div>
            <div>
              <p className="mb-3 block text-black dark:text-white">
                <b>Drivers District</b> : {driver?.district}
              </p>
            </div>
            <div>
              <p className="mb-3 block text-black dark:text-white">
                <b>Drivers Upazila</b> : {driver?.upazila}
              </p>
            </div>
            <div>
              <p className="mb-3 block text-black dark:text-white">
                <b>Drivers Car</b> : {driver?.car}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-9">
        {/* <!-- Input Fields --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Driving License Front Side
              </label>
              <Link
                to={`http://localhost:4000/uploads/${driver?.licenseFront}`}
                target="_blank"
              >
                <img
                  src={`http://localhost:4000/uploads/${driver?.licenseFront}`}
                  alt=""
                  className="w-40 h-40"
                />
              </Link>
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Driving License Back Side
              </label>
              <Link
                to={`http://localhost:4000/uploads/${driver?.licenseBack}`}
                target="_blank"
              >
                <img
                  src={`http://localhost:4000/uploads/${driver?.licenseBack}`}
                  alt=""
                  className="w-40 h-40"
                />
              </Link>
            </div>

            <div>
              <label className="mb-3 block text-black dark:text-white">
                Car Bluebook / RC Front Side
              </label>
              <Link
                to={`http://localhost:4000/uploads/${driver?.bluebookFront}`}
                target="_blank"
              >
                <img
                  src={`http://localhost:4000/uploads/${driver?.bluebookFront}`}
                  alt=""
                  className="w-40 h-40"
                />
              </Link>
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Car Bluebook / RC Back Side
              </label>
              <Link
                to={`http://localhost:4000/uploads/${driver?.bluebookBack}`}
                target="_blank"
              >
                <img
                  src={`http://localhost:4000/uploads/${driver?.bluebookBack}`}
                  alt=""
                  className="w-40 h-40"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
