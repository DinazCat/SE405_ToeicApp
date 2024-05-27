import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const GrammarContext = createContext({});


const ContentProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [articleContent, setArticleContent] = useState([]);
  const [articleContent2, setArticleContent2] = useState([]);
  const fetchArticleContent = async() => {
    let list = [];
    //noun
    await axios.get(`https://api.diffbot.com/v3/article?token=${'48f4ee28f347bf6b9131d270cec5a44d'}&url=${'https://grammar.dolenglish.vn/ly-thuyet/danh-tu'}`)
      .then(response => {
        if (response.data.objects && response.data.objects.length > 0) {
        list.push(response.data.objects[0].html)
        } else {
          list.push('<p>Unable to fetch content.</p>');
        }
      })
      .catch(error => console.error(error));
      setArticleContent(list)
      //compound noun https://grammar.dolenglish.vn/ly-thuyet/danh-tu/danh-tu-ghep
      await axios.get(`https://api.diffbot.com/v3/article?token=${'48f4ee28f347bf6b9131d270cec5a44d'}&url=${'https://grammar.dolenglish.vn/ly-thuyet/danh-tu/danh-tu-ghep'}`)
      .then(response => {
        if (response.data.objects && response.data.objects.length > 0) {
        list.push(response.data.objects[0].html)
        } else {
          list.push('<p>Unable to fetch content.</p>');
        }
      })
      .catch(error => console.error(error));
      setArticleContent(list)
      //Pronouns
      await axios.get(`https://api.diffbot.com/v3/article?token=${'48f4ee28f347bf6b9131d270cec5a44d'}&url=${'https://grammar.dolenglish.vn/ly-thuyet/dai-tu'}`)
      .then(response => {
        if (response.data.objects && response.data.objects.length > 0) {
        list.push(response.data.objects[0].html)
        } else {
          list.push('<p>Unable to fetch content.</p>');
        }
      })
      .catch(error => console.error(error));
      setArticleContent(list)
           //Noun phrase
           await axios.get(`https://api.diffbot.com/v3/article?token=${'48f4ee28f347bf6b9131d270cec5a44d'}&url=${'https://grammar.dolenglish.vn/ly-thuyet/danh-tu/cum-danh-tu-tieng-anh'}`)
           .then(response => {
             if (response.data.objects && response.data.objects.length > 0) {
             list.push(response.data.objects[0].html)
             } else {
               list.push('<p>Unable to fetch content.</p>');
             }
           })
           .catch(error => console.error(error));
           setArticleContent(list)
           let list2 = []
                  //Verb 
                  await axios.get(`https://api.diffbot.com/v3/article?token=${'48f4ee28f347bf6b9131d270cec5a44d'}&url=${'https://grammar.dolenglish.vn/ly-thuyet/dong-tu'}`)
                  .then(response => {
                    if (response.data.objects && response.data.objects.length > 0) {
                    list2.push(response.data.objects[0].html)
                    } else {
                      list2.push('<p>Unable to fetch content.</p>');
                    }
                  })
                  .catch(error => console.error(error));
                  setArticleContent2(list2)
                    //Modal Verb https://grammar.dolenglish.vn/ly-thuyet/dong-tu/dong-tu-khuyet-thieu
                    await axios.get(`https://api.diffbot.com/v3/article?token=${'48f4ee28f347bf6b9131d270cec5a44d'}&url=${'https://grammar.dolenglish.vn/ly-thuyet/dong-tu/dong-tu-khuyet-thieu'}`)
                    .then(response => {
                      if (response.data.objects && response.data.objects.length > 0) {
                      list2.push(response.data.objects[0].html)
                      } else {
                        list2.push('<p>Unable to fetch content.</p>');
                      }
                    })
                    .catch(error => console.error(error));
                    setArticleContent2(list2)
                    setLoading(false);
  };
  useEffect(() => {
    fetchArticleContent()
  }, []);

  return (
    <GrammarContext.Provider value={{  articleContent,articleContent2,loading }}>
      {children}
    </GrammarContext.Provider>
  );
};

export { GrammarContext, ContentProvider };
