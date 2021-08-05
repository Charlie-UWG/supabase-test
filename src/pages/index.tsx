import { Auth, Button, IconLogOut } from "@supabase/ui";
import { ReactNode, useCallback, useEffect, useState } from "react";
import React from "react";
import { LayoutWrapper } from "../components/layoutWrapper";
import { client } from "../libs/supabase";
import { Title, TitleList } from "src/components/titleList";

type Props = {
  children: ReactNode;
};

//DBから漫画タイトルを取得
const getTitles = async () => {
  const { data, error } = await client
    .from("manga_title")
    .select("*")
    .order("title");
  if (!error && data) {
    return data;
  }
  return [];
};

const Container = (props: Props) => {
  const { user } = Auth.useUser();
  const [text, setText] = useState<string>("");
  const [titles, setTitles] = useState<Title[]>([]);

  //DBから取得した漫画タイトルをセット
  const getTitleList = useCallback(async () => {
    const data = await getTitles();
    setTitles(data);
  }, []);

  useEffect(() => {
    getTitleList();
  }, [user, getTitleList]);

  //ログインしている場合
  if (user) {
    return (
      <div>
        <div>
          <input
            className=""
            placeholder="Filtering text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <TitleList
          titles={titles}
          uuid={user.id}
          getTitleList={getTitleList}
          filterText={text}
        />
        <div>
          <Button
            size="medium"
            icon={<IconLogOut />}
            onClick={() => client.auth.signOut()}
          >
            Sign Out
          </Button>
        </div>
      </div>
    );
  }
  //ログインしていない場合
  // console.log("ここ通るよね？");
  // console.log(props);

  return <>{props.children}</>;
};

const Home = () => {
  return (
    <LayoutWrapper>
      <Auth.UserContextProvider supabaseClient={client}>
        <Container>
          <div className="flex justify-center pt-8">
            <div>
              <Auth
                supabaseClient={client}
                providers={["github"]}
                socialColors={true}
              />
            </div>
          </div>
        </Container>
      </Auth.UserContextProvider>
    </LayoutWrapper>
  );
};

export default Home;
