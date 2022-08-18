import { TwitterTimelineEmbed } from 'react-twitter-embed';

interface TwitterProps {
  username: string;
}

export const Twitter: React.FC<TwitterProps> = ({ username }) => {
  return (
    
    <TwitterTimelineEmbed
      options={{
        height: 540
      }}
      
      screenName={username}
      sourceType="profile"
      noHeader={true}
      noFooter={true}
    />
  )
};