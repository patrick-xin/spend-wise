"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CURRENCIES } from "@/lib/constants";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { baseUrl } from "@/lib/utils";
import { UserSettings } from "@prisma/client";
import { updateUserCurrency } from "@/app/wizard/_actions";
import { toast } from "sonner";
import { Currency } from "@/lib/types";

type Status = {
  value: string;
  label: string;
};

function CurrencyComboBox() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedOption, setSelectedOption] = React.useState<Currency | null>(
    null
  );
  const userSettings = useSuspenseQuery<UserSettings>({
    queryKey: ["userSettings"],
    queryFn: async () => {
      const path = "/api/user-settings";
      const url = baseUrl + path;

      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });
  React.useEffect(() => {
    if (!userSettings.data) return;
    const userCurrency = CURRENCIES.find(
      (c) => c.value === userSettings.data.currency
    );
    if (userCurrency) {
      setSelectedOption(userCurrency);
    }
  }, [userSettings.data]);

  const mutation = useMutation({
    mutationFn: updateUserCurrency,
    onSuccess: (data: UserSettings) => {
      toast.success(`Currency updated successuflly 🎉`, {
        id: "update-currency",
      });

      setSelectedOption(
        CURRENCIES.find((c) => c.value === data.currency) || null
      );
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: "update-currency",
      });
    },
  });

  const handleSelect = React.useCallback(
    (currency: Currency | null) => {
      if (!currency) {
        toast.error("Please select currency");
        return;
      }
      toast.loading("updating currency", {
        id: "update-currency",
      });
      mutation.mutate(currency.value);
    },
    [mutation]
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={mutation.isPending}
            variant="outline"
            className="w-[150px] justify-start"
          >
            {selectedOption ? (
              <>{selectedOption.label}</>
            ) : (
              <>Select Currency</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedOption={handleSelect} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedOption ? <>{selectedOption.label}</> : <>Select Currency</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setSelectedOption={setSelectedOption} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  setSelectedOption,
}: {
  setOpen: (open: boolean) => void;
  setSelectedOption: (option: Currency | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Select currency..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {CURRENCIES.map((currency) => (
            <CommandItem
              key={currency.value}
              value={currency.value}
              onSelect={(value) => {
                setSelectedOption(
                  CURRENCIES.find((priority) => priority.value === value) ||
                    null
                );
                setOpen(false);
              }}
            >
              {currency.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default CurrencyComboBox;
