require('dotenv').config()
const express = require('express')
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

// (async () => {
//   const databaseId = "c45b139d1d8744f1a2386d5fbd5b6236"
//   const response = await notion.databases.retrieve({ database_id: databaseId });
//   console.log(response);
// })();

async function getDatabase() {
      const databaseId = process.env.NOTION_DATABASE_ID
      const response = await notion.databases.retrieve({ database_id: databaseId });
      console.log(response);
    
}
// getDatabase()

async function getTags() {
      const database = await notion.databases.retrieve({
        database_id: process.env.NOTION_DATABASE_ID,
      })
    
      return notionPropertiesById(database.properties)[
        process.env.NOTION_TAGS_ID
      ].multi_select.options.map(option => {
        return { id: option.id, name: option.name }
      })
}

// getTags().then(res => console.log(res)) 
// returns the multi select property values

function notionPropertiesById(properties) {
      return Object.values(properties).reduce((obj, property) => {
        const { id, ...rest } = property
        return { ...obj, [id]: rest }
      }, {})
}


function createEntry({ title = "" , comment = "" , link, tags }) {
      notion.pages.create({
            parent: {
                  database_id: process.env.NOTION_DATABASE_ID
            },
            properties: {
                  [process.env.NOTION_NAME_ID]: {
                        title: [
                              {
                                type: "text",
                                text: {
                                  content: title,
                                },
                              },
                        ],
                  },
                  [process.env.NOTION_COMMENT_ID]: {
                        rich_text: [
                              {
                                type: "text",
                                text: {
                                  content: comment,
                                },
                              },
                        ],
                  },
                  [process.env.NOTION_PROPERTY_ID]: {
                        url: link,
                  },
                  // [process.env.NOTION_TAGS_ID]: {
                  //       multi_select: tags.map(tag => {
                  //         return { id: tag.id }
                  //       }),
                  // },
                  [process.env.NOTION_TAGS_ID]: {
                        multi_select: [
                              {
                                 name: tags
                              },
                             
                        ]
                  },

            }
      })
}

createEntry({ title: "TEST13" , comment:"random", link: "youtube.com", tags: "youtube"});
// Test case

module.exports = {
      createEntry,
      getTags
}