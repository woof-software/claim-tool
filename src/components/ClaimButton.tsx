'use client';

const ClaimButton = () => {
  const handleClick = () => {
    console.log('claim');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Claim
    </button>
  );
};

export default ClaimButton;
