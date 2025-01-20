import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PlusCircle, XCircle, Settings2 } from 'lucide-react';
import type { WorkflowRule } from '@/types/workflow';

interface RuleBuilderProps {
  rule: WorkflowRule;
  onChange: (rule: WorkflowRule) => void;
  onDelete?: () => void;
}

const operators = [
  { value: 'equals', label: 'Equals' },
  { value: 'not_equals', label: 'Not Equals' },
  { value: 'contains', label: 'Contains' },
  { value: 'not_contains', label: 'Not Contains' },
  { value: 'greater_than', label: 'Greater Than' },
  { value: 'less_than', label: 'Less Than' },
  { value: 'starts_with', label: 'Starts With' },
  { value: 'ends_with', label: 'Ends With' },
  { value: 'is_empty', label: 'Is Empty' },
  { value: 'is_not_empty', label: 'Is Not Empty' }
];

const loopTypes = [
  { value: 'for_each', label: 'For Each' },
  { value: 'while', label: 'While' },
  { value: 'do_while', label: 'Do While' }
];

const RuleBuilder: React.FC<RuleBuilderProps> = ({
  rule,
  onChange,
  onDelete
}) => {
  const handleSettingChange = (
    key: keyof WorkflowRule['settings'],
    value: any
  ) => {
    onChange({
      ...rule,
      settings: {
        ...rule.settings,
        [key]: value
      }
    });
  };

  const renderConditionFields = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <Label>Field</Label>
          <Input
            placeholder="document.status"
            value={rule.settings.field || ''}
            onChange={(e) => handleSettingChange('field', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label>Operator</Label>
          <Select
            value={rule.settings.operator}
            onValueChange={(value) => handleSettingChange('operator', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select operator" />
            </SelectTrigger>
            <SelectContent>
              {operators.map((op) => (
                <SelectItem key={op.value} value={op.value}>
                  {op.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Value</Label>
          <Input
            placeholder="Value"
            value={rule.settings.value || ''}
            onChange={(e) => handleSettingChange('value', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );

  const renderLoopFields = () => (
    <div className="space-y-4">
      <div>
        <Label>Loop Type</Label>
        <Select
          value={rule.settings.loopType}
          onValueChange={(value) => handleSettingChange('loopType', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select loop type" />
          </SelectTrigger>
          <SelectContent>
            {loopTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Loop Condition</Label>
        <Input
          placeholder="index < array.length"
          value={rule.settings.loopCondition || ''}
          onChange={(e) => handleSettingChange('loopCondition', e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label>Max Iterations</Label>
        <Input
          type="number"
          placeholder="100"
          value={rule.settings.maxIterations || ''}
          onChange={(e) => handleSettingChange('maxIterations', parseInt(e.target.value))}
          className="mt-1"
        />
      </div>
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Settings2 className="h-4 w-4" />
          <CardTitle className="text-lg">
            {rule.type === 'condition' ? 'Condition Rule' : 'Loop Rule'}
          </CardTitle>
        </div>
        {onDelete && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="h-8 w-8 p-0"
          >
            <XCircle className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Label>Rule Type</Label>
            <Select
              value={rule.type}
              onValueChange={(value: 'condition' | 'loop') => 
                onChange({ ...rule, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="condition">Condition</SelectItem>
                <SelectItem value="loop">Loop</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {rule.type === 'condition' ? renderConditionFields() : renderLoopFields()}
        </div>
      </CardContent>
    </Card>
  );
};

interface RuleBuilderListProps {
  rules: WorkflowRule[];
  onChange: (rules: WorkflowRule[]) => void;
}

export const RuleBuilderList: React.FC<RuleBuilderListProps> = ({
  rules,
  onChange
}) => {
  const handleAddRule = () => {
    const newRule: WorkflowRule = {
      id: `rule-${Date.now()}`,
      type: 'condition',
      settings: {}
    };
    onChange([...rules, newRule]);
  };

  const handleUpdateRule = (index: number, updatedRule: WorkflowRule) => {
    const newRules = [...rules];
    newRules[index] = updatedRule;
    onChange(newRules);
  };

  const handleDeleteRule = (index: number) => {
    const newRules = rules.filter((_, i) => i !== index);
    onChange(newRules);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Workflow Rules</h3>
        <Button onClick={handleAddRule} variant="outline" size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Rule
        </Button>
      </div>
      
      <div className="space-y-4">
        {rules.map((rule, index) => (
          <RuleBuilder
            key={rule.id}
            rule={rule}
            onChange={(updatedRule) => handleUpdateRule(index, updatedRule)}
            onDelete={() => handleDeleteRule(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default RuleBuilder;