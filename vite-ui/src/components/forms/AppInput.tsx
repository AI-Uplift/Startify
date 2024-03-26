import { ChangeEvent, useState } from "react";
import { Control, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppInputProps {
	name?: string;
	label: string;
	value?: string;
	setValue?: (value: string) => void;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	type?: string;
	placeholder?: string;
	isPassword?: boolean;
	control?: Control<unknown>;
	isDisabled?: boolean;
	helperText?: string;
	error?: FieldError | Merge<FieldError, FieldErrorsImpl<unknown>> | Merge<FieldError, FieldError[]>;
	isRequired?: boolean;
	showLabel?: boolean;
	className?: string;
}

interface ControlledAppInputProps extends Omit<AppInputProps, "value" | "setValue" | "onChange"> {}

interface UncontrolledAppInputProps extends Omit<AppInputProps, "name" | "control" | "error"> {
	errorText?: string;
}

export interface AppInputFieldProps extends AppInputProps {
	isControlled?: boolean;
	errorText?: string;
}

const AppInput = (props: AppInputFieldProps) => {
	const { isControlled, ...rest } = props;

	if (isControlled || props.control) {
		return <ControlledInputField {...rest} />;
	}

	return <UnControlledInputField {...rest} />;
};

const UnControlledInputField = ({
	label,
	value,
	setValue,
	onChange,
	type = "text",
	placeholder,
	isDisabled,
	helperText,
	isRequired,
	isPassword = false,
	errorText,
	className,
	showLabel = true,
}: UncontrolledAppInputProps) => {
	const [showPassword, setShowPassword] = useState(false);
	const isPasswordInput = type === "password" || isPassword;

	return (
		<div className="flex flex-col space-y-4">
			{showLabel && (
				<Label>
					{label} {isRequired && <span className="text-red-500">*</span>}
				</Label>
			)}
			<div className="relative">
				<Input
					value={value}
					onChange={(e) => {
						setValue && setValue(e.target.value);
						onChange && onChange(e);
					}}
					type={isPasswordInput ? (showPassword ? "text" : "password") : type}
					placeholder={placeholder}
					disabled={isDisabled}
					className={cn(className)}
				/>
				{isPasswordInput && (
					<Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword((prev) => !prev)} disabled={isDisabled}>
						{showPassword && !isDisabled ? <EyeIcon className="h-4 w-4" aria-hidden="true" /> : <EyeOffIcon className="h-4 w-4" aria-hidden="true" />}
						<span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
					</Button>
				)}
				{/* hides browsers password toggles */}
				<style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
			</div>
			{helperText && <p className="text-sm text-muted-foreground">{helperText}</p>}
			{errorText && <p className="text-sm text-red-500">{errorText}</p>}
		</div>
	);
};

const ControlledInputField = ({ name, label, control, type = "text", placeholder, isDisabled, helperText, isRequired, isPassword = false, showLabel = true, className }: ControlledAppInputProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const isPasswordInput = type === "password" || isPassword;

	return (
		<FormField
			// @ts-expect-error - There is a bug with the types of FormField
			name={name}
			control={control}
			render={({ field }) => (
				<FormItem>
					{showLabel && (
						<FormLabel>
							{label} {isRequired && <span className="text-red-500">*</span>}
						</FormLabel>
					)}
					<FormControl>
						<div className="relative">
							<Input {...field} type={isPasswordInput ? (showPassword ? "text" : "password") : type} placeholder={placeholder} disabled={isDisabled} className={cn(className)} />
							{isPasswordInput && (
								<Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword((prev) => !prev)} disabled={isDisabled}>
									{showPassword && !isDisabled ? <EyeIcon className="h-4 w-4" aria-hidden="true" /> : <EyeOffIcon className="h-4 w-4" aria-hidden="true" />}
									<span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
								</Button>
							)}
							{/* hides browsers password toggles */}
							<style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
						</div>
					</FormControl>
					<FormDescription>{helperText}</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default AppInput;
