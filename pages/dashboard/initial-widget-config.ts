import { WidgetType } from "page-components/dashboard/WidgetMaker/context/types";
import { StatCategory, StatInterval, StatPeriod, StatType } from "widgets/StatCharter/context/types";

// Demo initial widget config. This should be pulled from the user's account on the server 
export const initialWidgetConfigs = [
  {
    "type": "highlights" as WidgetType,
    "config": {
      "title": "Steph's Highlights",
      "playerKey": "48edf6ae-d614-543a-8efb-29226093533e"
    }
  },
  {
    "type": "twitter" as WidgetType,
    "config": {
      "title": "LBJ's Twitter Feed",
      "username": "KingJames"
    }
  },
  {
    "type": "chart" as WidgetType,
    "config": {
      "title": "Career PPG: Lebron vs MJ",
      "category": "per_game" as StatCategory,
      "stat": "pts" as StatType,
      "interval": "age" as StatInterval,
      "period": "playoffs" as StatPeriod,
      "playersData": [
        {
          "__typename": "PlayerSearchResult",
          "firstName": "Michael",
          "lastName": "Jordan",
          "imgUrl": "https://www.basketball-reference.com/req/202106291/images/players/jordami01.jpg",
          "key": "7a428f4c-b7da-5ddd-bd1b-d9482fc3228f",
          "teamCode": "CHI",
          "twitter": null,
          "highlights": null
        },
        {
          "__typename": "PlayerSearchResult",
          "firstName": "LeBron",
          "lastName": "James",
          "imgUrl": "https://www.basketball-reference.com/req/202106291/images/players/jamesle01.jpg",
          "key": "d139b435-82a7-5bb3-8602-f2d878edcc56",
          "teamCode": "LAL",
          "twitter": "KingJames",
          "highlights": null
        }
      ]
    }
  },
  {
    "type": "twitter" as WidgetType,
    "config": {
      "title": "KD's Tweets",
      "username": "KDTrey5"
    }
  }
]