import { Dialog, Transition } from "@headlessui/react";
import { Button, IconPlus, IconX } from "@supabase/ui";
import Image from "next/image";
import { Fragment, useCallback, useState, VFC } from "react";

import { client } from "src/libs/supabase";

type props = {
  uuid: string;
  getTitleList: VoidFunction;
};

export const AddTitle: VFC<props> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  //ダイアログを開く
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  //ダイアログを閉じる
  const closeModal = useCallback(() => {
    setTitle("");
    setAuthor("");
    setIsOpen(false);
  }, []);

  //漫画タイトルの追加
  const handleAdd = useCallback(
    async (uuid: string) => {
      if (title == "") {
        alert("タイトルを入力してください");
        return;
      }
      const { data, error } = await client
        .from("manga_title")
        .insert([{ user_id: uuid, title: title, author: author }]);
      if (error) {
        alert(error);
      } else {
        if (data) {
          props.getTitleList();
          closeModal();
        }
      }
    },
    [title, author, props, closeModal]
  );

  return (
    <>
      <div>
        <div>ADD NEW</div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-auto"
            onClose={closeModal}
          >
            <div>
              <span>&#8203;</span>
              <Transition.Child as={Fragment} enter="ease-out duration-300">
                <div>
                  <Dialog.Title>Add Title</Dialog.Title>
                  <div>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => {
                        return setTitle(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <div>Author</div>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => {
                        return setAuthor(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <div>
                      <Button
                        block
                        type="default"
                        size="large"
                        icon={<IconX />}
                        onClick={closeModal}
                      >
                        Cncel
                      </Button>
                    </div>
                    <div>
                      <Button
                        block
                        size="large"
                        icon={<IconPlus />}
                        onClick={() => {
                          handleAdd(props.uuid);
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};
