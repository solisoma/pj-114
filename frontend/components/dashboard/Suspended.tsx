export default function Suspended() {
  return (
    <div className="flex items-center justify-center h-full bg-background3">
      <div className="bg-background2 shadow-md rounded-lg p-8 max-w-md text-center">
        <h1 className="text-2xl font-semibold text-[#D3D3D3] mb-4">
          Account Suspended
        </h1>
        <p className="text-white">
          We regret to inform you that your account has been suspended due to
          policy violations. Please contact our support team for more details.
        </p>
        <a
          href="https://wa.me/+2347066196550"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600"
        >
          Reach Out to Support
        </a>
      </div>
    </div>
  );
}
