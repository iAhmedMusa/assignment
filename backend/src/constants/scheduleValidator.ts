import { BadRequestException } from '@nestjs/common';
import { CreateScheduleDto } from 'src/schedules/dto/create-schedule.dto';

export const scheduleValidator = (days: CreateScheduleDto) => {
  // friday related validation

  if (days.friday_start && days.friday_end) {
    if (parseInt(days.friday_end) <= parseInt(days.friday_start)) {
      throw new BadRequestException(
        'friday end time should be bigger than start time',
      );
    }
  } else if (days.friday_start || days.friday_end) {
    if (!days.friday_end) {
      throw new BadRequestException('provide friday end time');
    } else {
      throw new BadRequestException('provide friday start time');
    }
  }

  // saturday related validation

  if (days.saturday_start && days.saturday_end) {
    if (parseInt(days.saturday_end) <= parseInt(days.saturday_start)) {
      throw new BadRequestException(
        'saturday end time should be bigger than start time',
      );
    }
  } else if (days.saturday_start || days.saturday_end) {
    if (!days.saturday_end) {
      throw new BadRequestException('provide saturday end time');
    } else {
      throw new BadRequestException('provide saturday start time');
    }
  }

  // sunday related validation

  if (days.sunday_start && days.sunday_end) {
    if (parseInt(days.sunday_end) <= parseInt(days.sunday_start)) {
      throw new BadRequestException(
        'sunday end time should be bigger than start time',
      );
    }
  } else if (days.sunday_start || days.sunday_end) {
    if (!days.sunday_end) {
      throw new BadRequestException('provide sunday end time');
    } else {
      throw new BadRequestException('provide sunday start time');
    }
  }

  // monday related validation

  if (days.monday_start && days.monday_end) {
    if (parseInt(days.monday_end) <= parseInt(days.monday_start)) {
      throw new BadRequestException(
        'monday end time should be bigger than start time',
      );
    }
  } else if (days.monday_start || days.monday_end) {
    if (!days.monday_end) {
      throw new BadRequestException('provide monday end time');
    } else {
      throw new BadRequestException('provide monday start time');
    }
  }

  // tuesday related validation

  if (days.tuesday_start && days.tuesday_end) {
    if (parseInt(days.tuesday_end) <= parseInt(days.tuesday_start)) {
      throw new BadRequestException(
        'tuesday end time should be bigger than start time',
      );
    }
  } else if (days.tuesday_start || days.tuesday_end) {
    if (!days.tuesday_end) {
      throw new BadRequestException('provide tuesday end time');
    } else {
      throw new BadRequestException('provide tuesday start time');
    }
  }

  // wednesday related validation

  if (days.wednesday_start && days.wednesday_end) {
    if (parseInt(days.wednesday_end) <= parseInt(days.wednesday_start)) {
      throw new BadRequestException(
        'wednesday end time should be bigger than start time',
      );
    }
  } else if (days.wednesday_start || days.wednesday_end) {
    if (!days.wednesday_end) {
      throw new BadRequestException('provide wednesday end time');
    } else {
      throw new BadRequestException('provide wednesday start time');
    }
  }

  // thursday related validation

  if (days.thursday_start && days.thursday_end) {
    if (parseInt(days.thursday_end) <= parseInt(days.thursday_start)) {
      throw new BadRequestException(
        'thursday end time should be bigger than start time',
      );
    }
  } else if (days.thursday_start || days.thursday_end) {
    if (!days.thursday_end) {
      throw new BadRequestException('provide thursday end time');
    } else {
      throw new BadRequestException('provide thursday start time');
    }
  }
};
