
interface SearchIconProps {
  size?: string;
}

export const SearchIcon: React.FC<SearchIconProps> = ({ size }) => {
  const normalizedSize = size ?? '24px' 

  return (
    <svg width={normalizedSize} height={normalizedSize} strokeWidth="1.5" viewBox={`0 0 24 24`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5 15.5L19 19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}
