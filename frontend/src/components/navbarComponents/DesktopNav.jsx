import React from 'react'
import { Link } from 'react-router-dom'

const DesktopNav = () => {
  return (
    <div className="w-[35vh] bg-slate-200 rounded-sm p-6 shadow-xl">
      <div className="text-[15px] mt-3 text-center items-center">
        <div>
          <Link
            to={"upload-desktop"}
            className="cursor-pointer hover:text-red-500"
          >
            Desktop
          </Link>
        </div>
        <div>
          <Link
            to={"upload-laptop"}
            className="cursor-pointer hover:text-red-500"
          >
            Laptop
          </Link>
        </div>

        <div>
          <Link className="cursor-pointer hover:text-red-500">Compoenent</Link>
        </div>
        <div>
          <Link
            to={"upload-monitor"}
            className="cursor-pointer hover:text-red-500"
          >
            Monitor
          </Link>
        </div>
        <div>
          <Link className="cursor-pointer hover:text-red-500">UPS</Link>
        </div>
        <div>
          <Link
            to={"upload-phone"}
            className="cursor-pointer hover:text-red-500"
          >
            Phone
          </Link>
        </div>
        <div>
          <div>
            <Link
              to={"upload-tablet"}
              className="cursor-pointer hover:text-red-500"
            >
              Tablet
            </Link>
          </div>
        </div>
        <div>
          <div>
            <Link className="cursor-pointer hover:text-red-500">
              Office equipment
            </Link>
          </div>
        </div>
        <div>
          <Link
            to={"upload-camera"}
            className="cursor-pointer hover:text-red-500"
          >
            Camera
          </Link>
        </div>

        <div>
          <Link className="cursor-pointer hover:text-red-500">Security</Link>
        </div>
        <div>
          <Link className="cursor-pointer hover:text-red-500">Networking</Link>
        </div>
        <div>
          <Link className="cursor-pointer hover:text-red-500">Software</Link>
        </div>
        <div>
          <Link className="cursor-pointer hover:text-red-500">
            Server & Storage
          </Link>
        </div>
        <div>
          <Link className="cursor-pointer hover:text-red-500">Accessories</Link>
        </div>
        <div>
          <Link className="cursor-pointer hover:text-red-500">Gadget</Link>
        </div>
        <div>
          <Link className="cursor-pointer hover:text-red-500">Gaming</Link>
        </div>
        <div>
          <Link className="cursor-pointer hover:text-red-500">TV</Link>
        </div>
        <div>
          <Link className="cursor-pointer hover:text-red-500">Appliance</Link>
        </div>
      </div>
    </div>
  )
}

export default DesktopNav