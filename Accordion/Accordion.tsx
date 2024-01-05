import { useState, ReactNode, SyntheticEvent } from "react";
import { AccordionDetails } from "@mui/material";
import { ArrowIcon } from "assets/icons";
import { AccordionMui, AccordionSummary } from "./styles";

interface AccordionProps {
	summary: ReactNode | string;
	children: ReactNode | string;
	isExpanded?: string | false;
	name: string;
	afterChange: (value: string | false) => void;
}

export const Accordion = ({
	summary,
	children,
	isExpanded,
	name,
	afterChange,
}: AccordionProps) => {
	const [expanded, setExpanded] = useState<string | false>(
		isExpanded ? name : false,
	);

	const handleChange =
		(panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
			const value = isExpanded ? panel : false;
			setExpanded(value);
			afterChange(value);
		};

	return (
		<AccordionMui expanded={expanded === name} onChange={handleChange(name)}>
			<AccordionSummary aria-controls='panel1bh-content' id='panel1bh-header'>
				{summary}
				<ArrowIcon />
			</AccordionSummary>
			<AccordionDetails>{children}</AccordionDetails>
		</AccordionMui>
	);
};
