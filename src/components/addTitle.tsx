import { Dialog, Transition } from "@headlessui/react";
import { Button, IconPlus, IconX } from "@supabase/ui";
import Image from "next/image";
import { Fragment, useCallback, useState, VFC } from "react";

import { client } from "src/libs/supabase";
